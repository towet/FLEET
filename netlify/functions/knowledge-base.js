const fs = require('fs');
const path = require('path');

// Path to the JSON data file
const dataFilePath = path.join(__dirname, 'knowledge-data.json');

// Helper function to read the data file
const readDataFile = () => {
  try {
    const rawData = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(rawData);
  } catch (error) {
    // If the file doesn't exist or has invalid JSON, return empty data structure
    return { entries: [] };
  }
};

// Helper function to write to the data file
const writeDataFile = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
};

// Initialize the data file if it doesn't exist
const initializeDataFile = () => {
  if (!fs.existsSync(dataFilePath)) {
    writeDataFile({ entries: [] });
  }
};

// CORS headers for cross-origin requests
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Content-Type': 'application/json'
};

exports.handler = async (event, context) => {
  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers
    };
  }

  try {
    // Initialize the data file if needed
    initializeDataFile();
    
    // Get the current data
    const data = readDataFile();
    
    // GET - Retrieve all knowledge entries
    if (event.httpMethod === 'GET') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data.entries)
      };
    }
    
    // POST - Create a new knowledge entry
    if (event.httpMethod === 'POST') {
      const newEntry = JSON.parse(event.body);
      
      // Add created_at timestamp
      newEntry.created_at = new Date().toISOString();
      
      // Add the new entry
      data.entries.push(newEntry);
      
      // Save the updated data
      writeDataFile(data);
      
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(newEntry)
      };
    }
    
    // PUT - Update an existing knowledge entry
    if (event.httpMethod === 'PUT') {
      const updatedEntry = JSON.parse(event.body);
      const { topic } = updatedEntry;
      
      // Add updated_at timestamp
      updatedEntry.updated_at = new Date().toISOString();
      
      // Find the entry to update
      const entryIndex = data.entries.findIndex(entry => entry.topic === topic);
      
      if (entryIndex === -1) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Entry not found' })
        };
      }
      
      // Update the entry
      data.entries[entryIndex] = updatedEntry;
      
      // Save the updated data
      writeDataFile(data);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(updatedEntry)
      };
    }
    
    // DELETE - Remove a knowledge entry
    if (event.httpMethod === 'DELETE') {
      const { topic } = JSON.parse(event.body);
      
      // Find the entry to delete
      const entryIndex = data.entries.findIndex(entry => entry.topic === topic);
      
      if (entryIndex === -1) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Entry not found' })
        };
      }
      
      // Remove the entry
      data.entries.splice(entryIndex, 1);
      
      // Save the updated data
      writeDataFile(data);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'Entry deleted successfully' })
      };
    }
    
    // If the HTTP method is not supported
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error', details: error.message })
    };
  }
};
