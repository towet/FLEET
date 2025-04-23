import { KnowledgeEntry, initialKnowledgeBase, searchKnowledgeBase as basicSearch } from '../../data/knowledgeBase';

const STORAGE_KEY = 'deezay_knowledge_base_entries';

// Load entries from localStorage
export const loadStoredEntries = (): KnowledgeEntry[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialKnowledgeBase;
  } catch (error) {
    console.error('Error loading stored entries:', error);
    return initialKnowledgeBase;
  }
};

// Save entries to localStorage
export const saveEntries = (entries: KnowledgeEntry[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Error saving entries:', error);
  }
};

// Initialize in-memory storage from localStorage
let entries: KnowledgeEntry[] = loadStoredEntries();

// Add a new knowledge entry
export const addKnowledgeEntry = async (entry: KnowledgeEntry): Promise<KnowledgeEntry> => {
  try {
    const newEntry = {
      ...entry,
      created_at: new Date().toISOString()
    };
    
    entries.push(newEntry);
    saveEntries(entries);
    return newEntry;
  } catch (error) {
    console.error('Error adding knowledge entry:', error);
    throw error;
  }
};

// Get all knowledge entries
export const getKnowledgeEntries = async (): Promise<KnowledgeEntry[]> => {
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
  entries = entries.filter(entry => entry.topic !== topic);
  saveEntries(entries);
};

// Update a knowledge entry
export const updateKnowledgeEntry = async (updatedEntry: KnowledgeEntry): Promise<void> => {
  entries = entries.map(entry => 
    entry.topic === updatedEntry.topic ? { ...updatedEntry, updated_at: new Date().toISOString() } : entry
  );
  saveEntries(entries);
};
