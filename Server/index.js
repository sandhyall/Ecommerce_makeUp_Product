const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors')
const UserRoutes = require('./App/router/web/userRoutes');
const ContactRoutes = require('./App/router/web/contactRoute');
require('dotenv').config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(express.json());

// User routes
app.use("/web/api/user", UserRoutes);
app.use("/web/api/contact", ContactRoutes);


// Connect MongoDB
mongoose.connect(process.env.DB)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
