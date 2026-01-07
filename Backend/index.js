// // const express = require("express");
// // // require("dotenv").config();  // Load .env variables
// // // const { checkToken, checkPass } = require("./checkTokenMiddleware");
// // const { dbConnection } = require("./dbConnection");

// // const app = express();//instilize
// // app.use(express.json());

// // // console.log("Token:", process.env.MyToken);
// // // console.log("Pass:", process.env.MyPass);

// // // // Protected routes
// // // app.get("/", checkToken, checkPass, (req, res) => {
// // //   res.send({ status: 1, msg: "home page api" });
// // // });

// // // app.get("/news", checkToken, checkPass, (req, res) => {
// // //   res.send({ status: 1, msg: "news page api" });
// // // });

// // // app.get("/news/:id", checkToken, checkPass, (req, res) => {
// // //     let currentdata = req.params.id;
// // //     res.send({ status: 1, msg: "news details", id: currentdata });
// // // });

// // // // Public route (login) - no middleware
// // // app.post("/login", (req, res) => {
// // //   console.log("Body:", req.body);
// // //   console.log("Query:", req.query);

// // //   res.send({
// // //     status: 1,
// // //     msg: "login page api",
// // //     bodyData: req.body,
// // //     queryData: req.query
// // //   });
// // // });
// // app.get("/student_read", (req, res) => {
// //   res.send("Student view url");
// // });

// // app.post("/student_insert", async (req, res) => {
// //   const myDB = await dbConnection();
// //   const studentCollection = myDB.collection("students");
// //   res.send("Student insert API");
// // });

// // app.listen(process.env.PORT||5000, () => {
// //   console.log("Server running on port 8000");
// // });

// // server.js
// const express = require("express");
// const { dbConnection } = require("./dbConnection");
// const { ObjectId } = require("mongodb");

// const app = express();
// app.use(express.json());

// // Connect to DB once so "MongoDB connected" shows
// dbConnection();

// // READ API
// app.get("/student_read", async  (req, res) => {
//     const myDB = await dbConnection();
//     const studentCollection = myDB.collection("students");
//     const data = await studentCollection.find().toArray();

//     const resobj = {
//         status: 1,
//         msg: "Student List",
//         data
//     }

//     res.send(resobj);
// });

// // INSERT API
// app.post("/student_insert", async (req, res) => {
//     const myDB = await dbConnection();
//     const studentCollection = myDB.collection("students");

//     const { name, email } = req.body;
//     const obj = { name, email };

//     // Check if email already exists
//     const checkEmail = await studentCollection.findOne({ email });

//     if (checkEmail) {
//          res.send({ status: 0, msg: "Email already exists" }); // Stop execution
//     }

//     // Insert new student
//     const insertRes = await studentCollection.insertOne(obj);

//     res.send({
//         status: 1,
//         msg: "Data inserted",
//         insertRes
//     });
// });

// // DELETE API
// app.delete("/student-delete/:id", async (req, res) => {
//   const { id } = req.params;

//   const myDB = await dbConnection();
//   const studentCollection = myDB.collection("students");

//   const delres = await studentCollection.deleteOne({ _id: new ObjectId(id) });
//   const resobj = {
//         status: 1,
//         msg: "delete the data",
//         delres
//     }

//   res.send(resobj);
// });

// //Update  api
// app.put("/students-update/:id",async (req,res)=>{
//    const { id } = req.params;

//    const { name, email } = req.body
//     const obj = {}
//     if(name!==""&& name!=null && name!=undefined){
//       obj["name"]=name

//     }
//     if(email!==""&& email!=null && email!=undefined){
//       obj["email"]=name
//     }
//     console.log(obj);

//   const myDb = await dbConnection();
//   const studentCollection = myDb.collection("students");

//   const updres = await studentCollection.updateOne({ _id: new ObjectId(id) },{$set:obj});
//   const resobj = {
//         status: 1,
//         msg: " data updata",
//         updres
//     }

//   res.send(resobj);
// })

// app.listen(8000, () => {
//     console.log("Server running on port 8000");
// });

const express = require("express");
const mongoose = require("mongoose");
const { enqueryRoute } = require("./App/routes/web/usernqueryroute");

require("dotenv").config();

const app = express();

//connect mongoose
mongoose.connect(process.env.DBURLS)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());
app.use("/web/api/enquery",enqueryRoute)
//local 
//http://localhost:8000/web/api/enquery/enquire-list

  
app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
