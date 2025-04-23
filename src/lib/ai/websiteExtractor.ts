import { KnowledgeEntry } from '../../data/knowledgeBase';
import { addKnowledgeEntry } from './knowledgeBase';

// Function to extract content from website components and add to knowledge base
export const extractWebsiteContent = async () => {
  try {
    // Array to store extracted entries
    const extractedEntries: KnowledgeEntry[] = [];
    
    // Extract content from DOM elements once the page is loaded
    const extractContent = () => {
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
      
      // Add all extracted entries to knowledge base
      extractedEntries.forEach(async entry => {
        try {
          await addKnowledgeEntry(entry);
        } catch (error) {
          console.error('Error adding extracted entry to knowledge base:', error);
        }
      });
      
      console.log(`Extracted ${extractedEntries.length} content entries from website`);
    };
    
    // Use MutationObserver to wait for content to load
    const observer = new MutationObserver((mutations) => {
      // Wait for significant changes to the DOM
      const significantChanges = mutations.some(mutation => 
        mutation.addedNodes.length > 5 || 
        (mutation.target as Element).querySelectorAll('*').length > 10
      );
      
      if (significantChanges) {
        // Wait a bit for everything to render
        setTimeout(() => {
          extractContent();
          observer.disconnect();
        }, 2000);
      }
    });
    
    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false
    });
    
    // Fallback - extract after 5 seconds anyway
    setTimeout(() => {
      extractContent();
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
  for (const entry of staticEntries) {
    try {
      await addKnowledgeEntry(entry);
    } catch (error) {
      console.error('Error adding static entry to knowledge base:', error);
    }
  }
  
  return staticEntries;
};
