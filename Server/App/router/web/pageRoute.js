const express = require("express");
const { getOrderspage, getAllProductspage } = require("../../controller/web/pageController");
const PageRoute = express.Router();

PageRoute.get("/orderpage",getOrderspage);
PageRoute.get("/productpage",getAllProductspage);

module.exports ={PageRoute};
