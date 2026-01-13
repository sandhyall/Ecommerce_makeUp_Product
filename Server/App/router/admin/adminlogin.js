const express = require("express");
const { AdminLogin } = require("../../controller/admin/adminController");

const AdminRoutes = express.Router();

AdminRoutes.post("/login", AdminLogin);

module.exports = AdminRoutes;
