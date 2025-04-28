//const express = require("express");
//const cors = require("cors");
//const app = express();
//const Joi = require("joi");
//const multer = require("multer");
//app.use(express.static("public"));
//app.use("/uploads", express.static("uploads"));
//app.use(express.json());
//app.use(cors());
const mongoose = require("mongoose");

//testdb is name of database, it will automatically make it
mongoose
  .connect("mongodb+srv://Audreyfh:spkqGMKIfpttN89t@dbtest.uuqjmci.mongodb.net/?retryWrites=true&w=majority&appName=DBTest")
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.error("could not connect ot mongodb...", err));

const schema = new mongoose.Schema({
  name: String,
});

async function createMessage() {
  const result = await message.save();
  console.log(result);
}

//this creates a Message class in our app
const Message = mongoose.model("Message", schema);
const message = new Message({
  name: "Hello World",
});

createMessage();
