require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import CORS
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB using the URI from .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Import and use the post routes
const postRoutes = require('./routes/posts');
app.use('/api/posts', postRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to My Ghost-inspired Blog!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
