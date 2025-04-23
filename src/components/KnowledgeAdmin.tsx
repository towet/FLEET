import React, { useState, useEffect } from 'react';
import { 
  getKnowledgeEntries, 
  addKnowledgeEntry, 
  removeKnowledgeEntry,
  updateKnowledgeEntry
} from '../lib/ai/knowledgeBase';
import { KnowledgeEntry } from '../data/knowledgeBase';

const KnowledgeAdmin: React.FC = () => {
  const [entries, setEntries] = useState<KnowledgeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('');
  
  // Form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<KnowledgeEntry>({
    topic: '',
    content: '',
    category: 'services',
    created_by: 'admin'
  });

  // Load knowledge entries on component mount
  useEffect(() => {
    loadEntries();
  }, []);

  // Load entries from the knowledge base
  const loadEntries = async () => {
    setLoading(true);
    try {
      const loadedEntries = await getKnowledgeEntries();
      setEntries(loadedEntries);
    } catch (error) {
      console.error('Error loading knowledge entries:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter entries based on search term and category
  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.topic.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? entry.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentEntry(prev => ({ ...prev, [name]: value }));
  };

  // Edit an existing entry
  const handleEditEntry = (entry: KnowledgeEntry) => {
    setCurrentEntry(entry);
    setEditMode(true);
    setIsFormOpen(true);
  };

  // Delete an entry
  const handleDeleteEntry = async (topic: string) => {
    if (window.confirm('Are you sure you want to delete this knowledge entry?')) {
      try {
        await removeKnowledgeEntry(topic);
        loadEntries(); // Reload entries after deletion
      } catch (error) {
        console.error('Error deleting entry:', error);
      }
    }
  };

  // Save form data (add new or update existing)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentEntry.topic || !currentEntry.content) {
      alert('Please fill in all required fields');
      return;
    }
    
    try {
      if (editMode) {
        await updateKnowledgeEntry(currentEntry);
      } else {
        await addKnowledgeEntry(currentEntry);
      }
      
      // Reset form and reload entries
      setCurrentEntry({
        topic: '',
        content: '',
        category: 'services',
        created_by: 'admin'
      });
      setIsFormOpen(false);
      setEditMode(false);
      loadEntries();
    } catch (error) {
      console.error('Error saving entry:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Knowledge Base Management</h1>
      
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Search knowledge base..."
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select 
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="services">Services</option>
            <option value="support">Support</option>
            <option value="pricing">Pricing</option>
            <option value="installation">Installation</option>
            <option value="general">General</option>
          </select>
        </div>
        
        <button 
          className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors"
          onClick={() => {
            setCurrentEntry({
              topic: '',
              content: '',
              category: 'services',
              created_by: 'admin'
            });
            setEditMode(false);
            setIsFormOpen(true);
          }}
        >
          Add New Entry
        </button>
      </div>
      
      {/* Entry Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{editMode ? 'Edit Knowledge Entry' : 'Add New Knowledge Entry'}</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Topic*</label>
                <input
                  type="text"
                  name="topic"
                  value={currentEntry.topic}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Category*</label>
                <select
                  name="category"
                  value={currentEntry.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="services">Services</option>
                  <option value="support">Support</option>
                  <option value="pricing">Pricing</option>
                  <option value="installation">Installation</option>
                  <option value="general">General</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Content*</label>
                <textarea
                  name="content"
                  value={currentEntry.content}
                  onChange={handleInputChange}
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                  onClick={() => setIsFormOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Knowledge Entries List */}
      <div className="space-y-4">
        {loading ? (
          <p>Loading knowledge base...</p>
        ) : filteredEntries.length === 0 ? (
          <p>No entries found. Try a different search or add a new entry.</p>
        ) : (
          filteredEntries.map((entry, index) => (
            <div key={index} className="border border-gray-200 rounded-md p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{entry.topic}</h3>
                  <span className="inline-block bg-gray-200 px-2 py-1 rounded-full text-xs font-semibold text-gray-700 mt-1">
                    {entry.category}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button 
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => handleEditEntry(entry)}
                  >
                    Edit
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteEntry(entry.topic)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="mt-2 whitespace-pre-line text-gray-700">
                {entry.content.length > 200 
                  ? `${entry.content.substring(0, 200)}...` 
                  : entry.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default KnowledgeAdmin;
