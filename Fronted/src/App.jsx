import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* USER */
import Layout from "./Component/UserLayout/Layout";
import Home from "./Pages/Home";
import Collectionpage from "./Pages/Collectionpage";
import BestSeller from "./Component/Product/BestSeller";
import Contactus from "./Pages/Contactus";
import Blogs from "./Pages/Blogs";
import CartButton from "./Component/Cart/CartButton";
import Checkout from "./Component/Cart/Checkout";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

/* ADMIN */
import Adminlogin from "./Pages/Adminlogin";
import AdminLayout from "./Component/Admin/AdminLayout";
import DashboardOverviw from "./Component/Admin/DashboardOverviw";

/* PROTECTION */
import PrivateRoute from "./Component/PrivateRoute/PrivateRoute";
import DashboardProduct from "./Component/Admin/DashboardProduct";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* USER */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="collection/:collection" element={<Collectionpage />} />
          <Route path="product/:id" element={<BestSeller />} />
          <Route path="contactus" element={<Contactus />} />
          <Route path="blog" element={<Blogs />} />
          <Route path="cart" element={<CartButton />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* ADMIN LOGIN */}
        <Route path="/adminlogin" element={<Adminlogin />} />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardOverviw />} />
          <Route path="overview" element={<DashboardOverviw />} />
          <Route path="product" element={<DashboardProduct/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;
