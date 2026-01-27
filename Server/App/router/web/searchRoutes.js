const express = require("express");
const Searchget = require("../../controller/web/searchController");

const SearchRoute = express.Router();

SearchRoute.get("/search", Searchget); 

module.exports = SearchRoute;
