import { KnowledgeEntry, initialKnowledgeBase, searchKnowledgeBase as basicSearch } from '../../data/knowledgeBase';

const STORAGE_KEY = 'deezay_knowledge_base_entries';
const API_URL = '/.netlify/functions/knowledge-base';

// In-memory cache of entries
let entries: KnowledgeEntry[] = [];
let isLoaded = false;

// Load entries from API and fallback to localStorage if offline
export const loadStoredEntries = async (): Promise<KnowledgeEntry[]> => {
  try {
    // Try to fetch from API first
    const response = await fetch(API_URL);
    if (response.ok) {
      const data = await response.json();
      // Save to localStorage as a cache
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      console.log('Loaded knowledge base entries from API:', data.length);
      return data;
    } 
    throw new Error('API request failed: ' + response.statusText);
  } catch (error) {
    console.warn('Could not load from API, using localStorage cache:', error);
    // Fallback to localStorage if API fails
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const cachedData = stored ? JSON.parse(stored) : initialKnowledgeBase;
      console.log('Using cached knowledge base entries:', cachedData.length);
      return cachedData;
    } catch (localError) {
      console.error('Error loading stored entries:', localError);
      return initialKnowledgeBase;
    }
  }
};

// Initialize entries - should be called when app starts
export const initializeKnowledgeBase = async () => {
  if (!isLoaded) {
    entries = await loadStoredEntries();
    isLoaded = true;
    console.log('Knowledge base initialized with', entries.length, 'entries');
  }
  return entries;
};

// Save entries to both API and localStorage
export const saveEntries = async (newEntries: KnowledgeEntry[]) => {
  entries = newEntries;
  
  // Always save to localStorage as a cache
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Error saving entries to localStorage:', error);
  }
};

// Add a new knowledge entry
export const addKnowledgeEntry = async (entry: KnowledgeEntry): Promise<KnowledgeEntry> => {
  try {
    const newEntry = {
      ...entry,
      created_at: new Date().toISOString()
    };
    
    // Try to save to API
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry)
      });
      
      if (response.ok) {
        const savedEntry = await response.json();
        // Update in-memory entries
        await initializeKnowledgeBase(); // Refresh the entire list
        return savedEntry;
      }
      throw new Error('API save failed: ' + response.statusText);
    } catch (apiError) {
      console.warn('Could not save to API, using local only:', apiError);
      // Fall back to local-only operation
      entries.push(newEntry);
      await saveEntries(entries);
      return newEntry;
    }
  } catch (error) {
    console.error('Error adding knowledge entry:', error);
    throw error;
  }
};

// Get all knowledge entries
export const getKnowledgeEntries = async (): Promise<KnowledgeEntry[]> => {
  if (!isLoaded) {
    await initializeKnowledgeBase();
  }
  return entries;
};

// Enhanced search that uses advanced scoring to find the most relevant entries
export const searchKnowledgeBase = (query: string): KnowledgeEntry[] => {
  const normalizedQuery = query.toLowerCase().trim();
  
  // If query is very short, use basic search
  if (normalizedQuery.length < 3) {
    return basicSearch(normalizedQuery);
  }
  
  // Split query into keywords
  const keywords = normalizedQuery.split(/\s+/).filter(word => word.length > 2);
  
  // Calculate relevance score for each entry
  const scoredEntries = entries.map(entry => {
    const normalizedContent = entry.content.toLowerCase();
    const normalizedTopic = entry.topic.toLowerCase();
    
    // Initialize score
    let score = 0;
    
    // Check for exact match in topic (highest priority)
    if (normalizedTopic.includes(normalizedQuery)) {
      score += 100;
    }
    
    // Check for exact match in content
    if (normalizedContent.includes(normalizedQuery)) {
      score += 50;
    }
    
    // Check for keyword matches
    for (const keyword of keywords) {
      if (normalizedTopic.includes(keyword)) {
        score += 10;
      }
      
      if (normalizedContent.includes(keyword)) {
        score += 5;
      }
      
      // Bonus for word boundaries
      const topicWordBoundary = new RegExp(`\\b${keyword}\\b`, 'i');
      const contentWordBoundary = new RegExp(`\\b${keyword}\\b`, 'i');
      
      if (topicWordBoundary.test(normalizedTopic)) {
        score += 5;
      }
      
      if (contentWordBoundary.test(normalizedContent)) {
        score += 2;
      }
    }
    
    return { entry, score };
  });
  
  // Sort by score (descending) and filter out irrelevant entries
  const relevantEntries = scoredEntries
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.entry);
  
  return relevantEntries.slice(0, 5); // Return top 5 most relevant entries
};

// Filter entries by category
export const getKnowledgeByCategory = (category: KnowledgeEntry['category']): KnowledgeEntry[] => {
  return entries.filter(entry => entry.category === category);
};

// Remove a knowledge entry
export const removeKnowledgeEntry = async (topic: string): Promise<void> => {
  try {
    // Try to delete via API
    const response = await fetch(API_URL, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic })
    });
    
    if (response.ok) {
      // Refresh the entries after successful deletion
      await initializeKnowledgeBase();
      return;
    }
    throw new Error('API delete failed: ' + response.statusText);
  } catch (apiError) {
    console.warn('Could not delete via API, using local only:', apiError);
    // Fall back to local-only operation
    entries = entries.filter(entry => entry.topic !== topic);
    await saveEntries(entries);
  }
};

// Update a knowledge entry
export const updateKnowledgeEntry = async (updatedEntry: KnowledgeEntry): Promise<void> => {
  try {
    const entryToUpdate = { 
      ...updatedEntry, 
      updated_at: new Date().toISOString() 
    };
    
    // Try to update via API
    const response = await fetch(API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entryToUpdate)
    });
    
    if (response.ok) {
      // Refresh the entries after successful update
      await initializeKnowledgeBase();
      return;
    }
    throw new Error('API update failed: ' + response.statusText);
  } catch (apiError) {
    console.warn('Could not update via API, using local only:', apiError);
    // Fall back to local-only operation
    entries = entries.map(entry => 
      entry.topic === updatedEntry.topic ? { ...updatedEntry, updated_at: new Date().toISOString() } : entry
    );
    await saveEntries(entries);
  }
};
