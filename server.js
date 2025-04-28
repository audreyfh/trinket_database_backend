const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors());
const mongoose = require("mongoose");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

mongoose
  .connect("mongodb+srv://Audreyfh:spkqGMKIfpttN89t@dbtest.uuqjmci.mongodb.net/")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("couldn't connect to mongodb", error);
  });

const trinketSchema = new mongoose.Schema({
  name: String,
  year: String,
  value: String,
  origin: String,
  description: String,
  rating: String,
  categories: [String],
  imgsquare: String,
  image2by1: String,
  image5by4: String,
});

const Trinket = mongoose.model("Trinket", trinketSchema);

app.get("/",(req, res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.get("/api/trinkets", async (req, res)=>{
    const trinkets = await Trinket.find();
    res.send(trinkets);
});

app.get("/api/trinkets/:id", async (req, res) => {
    const trinket = await Trinket.findOne({ _id: id });
    res.send(trinket);
  });

  app.post("/api/trinkets", upload.single("img"), async (req, res) => {
    const result = validateTrinket(req.body);
  
    if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
    }
  
    const trinket = new Trinket({
      name: req.body.name,
      year: req.body.year,
      value: req.body.value,
      origin: req.body.origin,
      description: req.body.description,
      rating: req.body.rating,
      categories: req.body.categories,
      extraparam: "null",
    });
  
    if (req.file) {
      trinket.imagesquare = "images/" + req.file.filename;
      trinket.image2by1 = "images/" + req.file.filename;
      trinket.image5by4 = "images/" + req.file.filename;
    }
  
    const newTrinket = await trinket.save();
    res.send(newTrinket);
  });

app.put("/api/trinkets/:id", upload.single("img"), async (req, res) => {
    const result = validateTrinket(req.body);
  
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    let trinket = trinkets.find((t) => t.ranking_id === parseInt(req.params.id));
  
    if (!trinket) res.status(400).send("Trinket with given id was not found");
  
    let fieldsToUpdate = {
        name: req.body.name,
        year: req.body.year,
        value: req.body.value,
        origin: req.body.origin,
        description: req.body.description,
        rating: req.body.rating,
    };

    if (req.file) {
        fieldsToUpdate.imagesquare = "images/" + req.file.filename;
        fieldsToUpdate.image2by1 = "images/" + req.file.filename;
        fieldsToUpdate.image5by4 = "images/" + req.file.filename;
    }

    const wentThrough = await Trinket.updateOne(
        { _id: req.params.id },
        fieldsToUpdate
    );

    const updatedTrinket = await Trinket.findOne({ _id: req.params.id });
    res.send(updatedTrinket);
});

app.delete("/api/trinkets/:id", async (req, res) => {
    const trinket = await House.findByIdAndDelete(req.params.id);
    res.send(trinket);
});
  
const validateTrinket = (trinket) => {
    // Parse categories from JSON string if necessary
    if (typeof trinket.categories === 'string') {
        trinket.categories = JSON.parse(trinket.categories);
    }
    const schema = Joi.object({
      ranking_id: Joi.allow(""),
      name: Joi.string().min(3).required(),
      year: Joi.string().required(),
      value: Joi.string().required(),
      origin: Joi.string().required(),
      description: Joi.string().required(),
      rating: Joi.string().required(),
      categories: Joi.array().items(Joi.string()).required(),  // Ensure categories is an array of strings
    });
  
    return schema.validate(trinket);
  };

app.listen(3001, ()=>{
    console.log("I'm listening");
});