const express = require("express");
const ContactInsert = require("../../controller/web/contactController");

const ContactRoutes = express.Router();

ContactRoutes.post("/contact-insert", ContactInsert);

module.exports = ContactRoutes;
