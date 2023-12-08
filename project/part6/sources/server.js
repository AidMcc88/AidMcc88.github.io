const express = require("express");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");

const upload = multer({ dest: __dirname + "/public/images" });

mongoose
  .connect(
    "mongodb+srv://aidmcc88:dzrn36ej@cluster0.gmtl9ec.mongodb.net/"
  )
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.error("Could not connect to mongodb", err));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const sourceSchema = new mongoose.Schema({
  name: String,
  link: String,
  citations: [String],
  img: String,
  /*  _id: mongoose.SchemaTypes.ObjectId*/
});

const Source = mongoose.model("Source", sourceSchema);

app.get("/api/sources", (req, res) => {
  getSources(res);
});

const getSources = async (res) => {
  const sources = await Source.find();
  res.send(sources);
};

app.post("/api/sources", upload.single("img"), (req, res) => {
  const result = validateSource(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const source = new Source({
    name: req.body.name,
    link: req.body.link,
    citations: req.body.citations.split(","),
  });

  if (req.file) {
    source.img = "images/" + req.file.filename;
  }

  createSource(source, res);
});

const createSource = async (source, res) => {
  const result = await source.save();
  res.send(source);
};

app.put("/api/sources/:id", upload.single("img"), (req, res) => {
  const result = validateSource(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  updateSource(req, res);
});

const updateSource = async (req, res) => {
  let fieldsToUpdate = {
    name: req.body.name,
    link: req.body.link,
    citations: req.body.citations.split(","),
  };

  if (req.file) {
    fieldsToUpdate.img = "images/" + req.file.filename;
  }

  const result = await Source.updateOne({ _id: req.params.id }, fieldsToUpdate);
  const source = await Source.findById(req.params.id);
  res.send(source);
};

app.delete("/api/sources/:id", upload.single("img"), (req, res) => {
  removeSource(res, req.params.id);
});

const removeSource = async (res, id) => {
  const source = await Source.findByIdAndDelete(id);
  res.send(source);
};

const validateSource = (source) => {
  const schema = Joi.object({
    _id: Joi.allow(""),
    citations: Joi.allow(""),
    name: Joi.string().min(3).required(),
    link: Joi.string().min(3).required(),
  });

  return schema.validate(source);
};

app.listen(3001, () => {
  console.log("I'm listening");
});