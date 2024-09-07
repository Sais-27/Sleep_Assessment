const express = require('express');
const app = express();
const port = 3000;
const authRoutes = require('./routes/auth');
const mongoose = require('mongoose'); // Import Mongoose

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/sleep-assessment', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (like HTML)
app.use(express.static('public'));

// Routes for signup and login
app.use('/auth', authRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});