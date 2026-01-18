const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const UserRoutes = require('./App/router/web/userRoutes');
const ContactRoutes = require('./App/router/web/contactRoute');
const AdminRoutes = require('./App/router/admin/adminlogin');
const { AddProductRoute } = require('./App/router/admin/Addproductroute');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/web/api/user", UserRoutes);
app.use("/web/api/contact", ContactRoutes);
app.use("/admin", AdminRoutes);
app.use("/upload", express.static("upload"));
app.use(express.urlencoded({ extended: true }));

app.use("/addproduct", AddProductRoute);


mongoose.connect(process.env.DB)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
