// const mongoose = require("mongoose");
// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const UserRoutes = require("./App/router/web/userRoutes");
// const ContactRoutes = require("./App/router/web/contactRoute");
// const AdminRoutes = require("./App/router/admin/adminlogin");

// const OrderRoutes = require("./App/router/admin/orderroute");

// const Router = require("./App/router/admin/Addproductroute");

// const { CartRoute } = require("./App/router/admin/addcartRouter");
// const ChartRoute = require("./App/router/admin/chartRouter");
// const { PageRoute } = require("./App/router/web/pageRoute");

// const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   }),
// );

// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Server is running");
// });

// app.use("/web/api/user", UserRoutes);
// app.use("/web/api/contact", ContactRoutes);
// app.use("/admin", AdminRoutes);

// app.use(express.urlencoded({ extended: true }));
// app.use("/upload", express.static("upload"));

// app.use("/addproduct", Router);

// app.use("/order", OrderRoutes);

// app.use("/cart", CartRoute);

// app.use("/chart", ChartRoute);

// app.use("/page", PageRoute);
// mongoose
//   .connect(process.env.DB)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));


const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const UserRoutes = require("./App/router/web/userRoutes");
const ContactRoutes = require("./App/router/web/contactRoute");
const AdminRoutes = require("./App/router/admin/adminlogin");
const OrderRoutes = require("./App/router/admin/orderroute");
const Router = require("./App/router/admin/Addproductroute");
const { CartRoute } = require("./App/router/admin/addcartRouter");
const ChartRoute = require("./App/router/admin/chartRouter");
const { PageRoute } = require("./App/router/web/pageRoute");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ecommerce-make-up-product-t7vc.vercel.app", 
    ],
    credentials: true,
  })
);

// Static Folder
app.use("/upload", express.static("upload"));

// Test Route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Routes
app.use("/web/api/user", UserRoutes);
app.use("/web/api/contact", ContactRoutes);
app.use("/admin", AdminRoutes);
app.use("/addproduct", Router);
app.use("/order", OrderRoutes);
app.use("/cart", CartRoute);
app.use("/chart", ChartRoute);
app.use("/page", PageRoute);

// Database
mongoose
  .connect(process.env.DB)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});