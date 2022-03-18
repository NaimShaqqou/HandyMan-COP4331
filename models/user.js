const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema
const UserSchema = new Schema({

  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  Username: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required:true
  },
  ProfileDescription: {
    type: String,
    required: true
  },
  ProfilePicture: {
    type: Image,
    contentType:String
  },
});
module.exports = user = mongoose.model("Users", UserSchema);
