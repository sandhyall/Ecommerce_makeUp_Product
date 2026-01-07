const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,   
  },
  email: {
    type: String,
    required: true,
    unique: true,     // ensures email is unique in the collection
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

// 'enquires' is the collection name in MongoDB
// enquirySchema defines the structure of documents in that collection
const enquiremodels = mongoose.model("enquires", enquirySchema);

module.exports = enquiremodels;
