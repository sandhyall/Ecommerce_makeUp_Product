const express = require("express");
const { RegisterInsert, RegisterLogin } = require("../../controller/web/UserController");

const UserRoutes = express.Router();

// Register
UserRoutes.post("/user-register", RegisterInsert);

// Login route 
UserRoutes.post("/user-login",RegisterLogin );

module.exports = UserRoutes;
