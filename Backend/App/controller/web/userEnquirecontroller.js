const enquiremodels = require("../../models/enquiry.model");
const { ObjectId } = require("mongodb");


//insert
const Insertenquery = (req, res) => {
  const { name, email, phone, message } = req.body;

  const enquiry = new enquiremodels({
    name: name,
    email: email,
    phone: phone,
    message: message,
  });

  enquiry
    .save()
    .then(() => {
      res.send({ status: 1, msg: "Data inserted successfully" });
    })
    .catch(() => {
      res.send({ status: 0, msg: "Email already exists" });
    });
};

//list

const enquerylist =  async (req, res) => {
  const enquirelist = await enquiremodels.find();
  res.send({ status: 1, msg: "enquire list", data: enquirelist });
}

//Delete
const deleteenquery = async (req, res) => {
  const enquireid = req.params.id;
  const deletequert = await enquiremodels.deleteOne({ _id: enquireid });

  res.send({ status: 1, msg: "enquire delete", deletequert });
};

//update
const updateenquery = async (req, res) => {
  const enquireid = req.params.id;
  const { name, email, phone, message } = req.body;

  const updateModel = {
    name: name,
    email: email,
    phone: phone,
    message: message,
  };

  const updaquert = await enquiremodels.updateOne(
    { _id: new ObjectId(enquireid) },
    { $set: updateModel }
  );

  res.send({ status: 1, msg: "Enquiry updated", updaquert });
};
module.exports = {Insertenquery,enquerylist,deleteenquery,updateenquery}