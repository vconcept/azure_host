// server.js - Express backend server for Contact Management System
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contacts');

// Load environment variables
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json()); // Parse JSON request bodies

// API Routes
app.use('/api/contacts', contactRoutes);

// Serve static files from React build directory
const clientPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientPath));

// Health check endpoint
app.get('/api', (req, res) => {
  res.json({ message: 'Contact Management API is running' });
});

// Catch-all route: Serve React app for client-side routing
app.get(/^(?!\/api\/).*/, (req, res) => {
  // Check if the requested file exists as a static asset
  const filePath = path.join(clientPath, req.path);
  
  // Serve index.html for all non-API routes (SPA fallback)
  res.sendFile(path.join(clientPath, 'index.html'), (err) => {
    if (err) {
      res.status(404).json({ message: 'Not found' });
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`Serving static files from: ${clientPath}`);
});
