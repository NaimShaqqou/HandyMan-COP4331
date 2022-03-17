const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema
const ServicesSchema = new Schema({
    ServiceId: {
        type: Number
    },
    UserId: {
        type: Number
    },
    Title: {
        type: String,
        required: true
    },
    Images: {
        type: Image,
        required: true
    },
    Longitude: {
        type: String,
        required: true
    },
    Latitude: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required:true
    },
    Price: {
        type: String,
        required: true
    },
    DaysAvailable: [{
        type: String,
        required:true
    }],
    Category:{
        type:String,
        requried:true
    },
    });
module.exports = user = mongoose.model("Services", ServicesSchema);