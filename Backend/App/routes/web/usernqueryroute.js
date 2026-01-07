const express = require("express");
const { Insertenquery, enquerylist, deleteenquery, updateenquery } = require("../../controller/web/userEnquirecontroller");
const enqueryRoute = express.Router();


enqueryRoute.post("/enquire_insert",Insertenquery )

enqueryRoute.get("/enquire-list",enquerylist);

//delete
enqueryRoute.delete("/enquire-delete/:id", deleteenquery);

//update
enqueryRoute.put("/enquire-update/:id", updateenquery);

module.exports = {enqueryRoute};

