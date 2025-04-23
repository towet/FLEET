import { KnowledgeEntry } from '../../data/knowledgeBase';
import { addKnowledgeEntry, getKnowledgeEntries } from './knowledgeBase';

// Unique identifiers for system-extracted content
const CONTENT_SOURCE = 'website_extractor';
const WEBSITE_ENTRIES_KEY = 'deezay_extracted_website_entries';

// Function to extract content from website components and add to knowledge base
export const extractWebsiteContent = async () => {
  try {
    // Array to store extracted entries
    const extractedEntries: KnowledgeEntry[] = [];
    
    // Extract content from DOM elements once the page is loaded
    const extractContent = async () => {
      // Extract company information from footer
      const footerInfo = document.querySelector('footer');
      if (footerInfo) {
        const footerText = footerInfo.textContent || '';
        const phoneElements = footerInfo.querySelectorAll('a[href^="tel:"]');
        const emailElements = footerInfo.querySelectorAll('a[href^="mailto:"]');
        
        let phoneNumbers = '';
        let emailAddresses = '';
        
        phoneElements.forEach(element => {
          phoneNumbers += element.textContent + ' ';
        });
        
        emailElements.forEach(element => {
          emailAddresses += element.textContent + ' ';
        });
        
        extractedEntries.push({
          topic: 'Company Contact Information',
          content: `Phone: ${phoneNumbers.trim()}\nEmail: ${emailAddresses.trim()}\nAdditional Contact Info: ${footerText.substring(0, 500)}...`,
          category: 'general',
          created_by: 'system'
        });
      }
      
      // Extract location information 
      const locationElements = document.querySelectorAll('.location, address, .contact-info');
      locationElements.forEach(element => {
        const locationText = element.textContent || '';
        if (locationText.length > 20) { // Only meaningful content
          extractedEntries.push({
            topic: 'Company Location',
            content: locationText,
            category: 'general',
            created_by: 'system'
          });
        }
      });
      
      // Extract service information from service components
      const serviceComponents = document.querySelectorAll('[class*="service"], [class*="feature"], [id*="service"], [id*="feature"]');
      serviceComponents.forEach((component, index) => {
        const heading = component.querySelector('h1, h2, h3, h4, h5, h6');
        const paragraphs = component.querySelectorAll('p');
        
        if (heading) {
          let serviceContent = '';
          paragraphs.forEach(p => {
            serviceContent += p.textContent + '\n';
          });
          
          if (serviceContent.length > 50) { // Only meaningful content
            extractedEntries.push({
              topic: heading.textContent || `Service Information ${index + 1}`,
              content: serviceContent,
              category: 'services',
              created_by: 'system'
            });
          }
        }
      });
      
      // Extract about us information
      const aboutUsElements = document.querySelectorAll('[class*="about"], [id*="about"], .company-info');
      aboutUsElements.forEach((element) => {
        const aboutContent = element.textContent || '';
        if (aboutContent.length > 100) { // Only meaningful content
          extractedEntries.push({
            topic: 'About Deezay Ecofuel',
            content: aboutContent.substring(0, 1000), // Limit content length
            category: 'general',
            created_by: 'system'
          });
        }
      });
      
      // Check if entries already exist to avoid duplicates
      try {
        const existingEntries = await getKnowledgeEntries();
        
        // Tag all extracted entries with source identifier
        const taggedEntries = extractedEntries.map(entry => ({
          ...entry,
          source: CONTENT_SOURCE,
          extraction_date: new Date().toISOString()
        }));
        
        // Save unique identifier list to localStorage for cleanup later
        const extractedTopics = taggedEntries.map(entry => entry.topic);
        localStorage.setItem(WEBSITE_ENTRIES_KEY, JSON.stringify(extractedTopics));
        
        // Add each entry, avoiding duplicates by topic
        for (const entry of taggedEntries) {
          // Check if this topic already exists
          const existingEntry = existingEntries.find(e => e.topic === entry.topic);
          
          if (!existingEntry) {
            // New entry - add it
            console.log('Adding extracted website content:', entry.topic);
            try {
              await addKnowledgeEntry(entry);
            } catch (error) {
              console.error('Error adding extracted entry to knowledge base:', error);
            }
          } else if (existingEntry.source === CONTENT_SOURCE) {
            // Existing website-extracted entry - update it if needed
            // This would require implementing an update function
            console.log('Website content already exists for:', entry.topic);
          } else {
            // Existing manually-added entry - don't overwrite
            console.log('Manual entry already exists for:', entry.topic);
          }
        }
      } catch (error) {
        console.error('Error processing extracted entries:', error);
      }
      
      console.log(`Extracted ${extractedEntries.length} content entries from website`);
    };
    
    // Use MutationObserver to wait for content to load
    const observer = new MutationObserver(async (mutations) => {
      // Wait for significant changes to the DOM
      const significantChanges = mutations.some(mutation => 
        mutation.addedNodes.length > 5 || 
        (mutation.target as Element).querySelectorAll('*').length > 10
      );
      
      if (significantChanges) {
        // Wait a bit for everything to render
        await new Promise(resolve => setTimeout(resolve, 2000));
        await extractContent();
        observer.disconnect();
      }
    });
    
    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false
    });
    
    // Fallback - extract after 5 seconds anyway
    setTimeout(async () => {
      await extractContent();
      observer.disconnect();
    }, 5000);
    
    return extractedEntries;
  } catch (error) {
    console.error('Error extracting website content:', error);
    return [];
  }
};

// Function to extract static content from React components
// This should be run during initialization
export const extractStaticContent = async () => {
  // Add known information from the codebase
  const staticEntries: KnowledgeEntry[] = [
    {
      topic: 'Company Location',
      content: 'Deezay Ecofuel is located in Addis Ababa, Ethiopia. We offer on-site installation services at your business location throughout Ethiopia and other East African countries.',
      category: 'general',
      created_by: 'system'
    },
    {
      topic: 'Company Contact Information',
      content: 'Phone: +254 798888658\nEmail: Info@deezayecofuel.co.et\nWorking Hours: Monday-Friday: 8AM - 6PM',
      category: 'general',
      created_by: 'system'
    },
    {
      topic: 'Fleet Vehicles Tracked',
      content: 'Deezay Ecofuel currently tracks 20+ fleet vehicles with our advanced tracking systems.',
      category: 'general',
      created_by: 'system'
    }
  ];
  
  // Add static entries to knowledge base
  try {
    const existingEntries = await getKnowledgeEntries();
    
    // Tag static entries with source
    const taggedEntries = staticEntries.map(entry => ({
      ...entry,
      source: 'static_content',
      extraction_date: new Date().toISOString()
    }));
    
    // Add each entry if it doesn't exist yet
    for (const entry of taggedEntries) {
      // Check if this topic already exists
      const existingEntry = existingEntries.find(e => e.topic === entry.topic);
      
      if (!existingEntry) {
        // New entry - add it
        console.log('Adding static content:', entry.topic);
        try {
          await addKnowledgeEntry(entry);
        } catch (error) {
          console.error('Error adding static entry to knowledge base:', error);
        }
      } else {
        console.log('Entry already exists for:', entry.topic);
      }
    }
  } catch (error) {
    console.error('Error processing static entries:', error);
  }
  
  return staticEntries;
};
