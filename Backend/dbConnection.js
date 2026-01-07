const { MongoClient } = require("mongodb");

const dbConnectionUrls = "mongodb://127.0.0.1:27017";
const client = new MongoClient(dbConnectionUrls);

const dbConnection = async () => {
  await client.connect();
  const db = client.db("mongoDBProject_Database");
  console.log("MongoDB connected");
  return db;
};

module.exports = { dbConnection };
