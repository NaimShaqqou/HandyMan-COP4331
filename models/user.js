const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema
const UserSchema = new Schema({

  FirstName: {
    type: String,
    required: true,
    trim: true,
  },
  LastName: {
    type: String,
    required: true,
    trim: true,
  },
  Username: {
    type: String,
    required: true,
    trim: true,
  },
  Password: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required:true,
    // makes sure that the input is a valid email address
    // I will test this once register api is complete
    // validate: value => {
    //   if (!validator.isEmail(value)) {
    //     throw new Error({error: 'Invalid Email Address'})
    //   }
    // },

  },
  ProfileDescription: {
    type: String,
    default: '',
    trim: true,
  },
  ProfilePicture: {
    type: String,
    default: '',
    trim: true,
  },
});
module.exports = user = mongoose.model("Users", UserSchema);
