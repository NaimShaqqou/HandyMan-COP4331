const express = require("express"); // middleware
const bodyParser = require("body-parser"); // to parse json
const cors = require("cors"); // prevents cors errors
require("dotenv").config();

const path = require("path");
const PORT = process.env.PORT || 5000;

var multer = require('multer');
const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");

// Account access information
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Uploading Image Configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images",
    format: async () => "png",
    public_id: (req, file) => file.filename
  }
});
const parser = multer({ storage: storage });

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({
  extended: true
}))

app.set("port", process.env.PORT || 5000);

const url = process.env.MONGODB_URI;
const mongoose = require("mongoose");
mongoose.connect(url)
  .then(() => console.log("Mongo DB connected"))
  .catch(err => console.log(err));


var api = require('./api.js')
api.setApp( app, mongoose , parser );

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );

  next();
});

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});

// For Heroku deployment

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}
