const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/campuses', require('./routes/campuses'));
app.use('/api/schools', require('./routes/schools'));
app.use('/api/students', require('./routes/students'));
app.use('/api/gallery', require('./routes/gallery'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
