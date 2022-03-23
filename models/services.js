const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema
const ServicesSchema = new Schema({
    
    UserId: 
        {
            type: Schema.Types.ObjectId, ref: 'Users'
        }
    ,
    Title: {
        type: String,
        required: true
    },
    Images: {
        type: [String],
        required: true
    },
    Address: {
        type: String,
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
    DaysAvailable: {
        type: [String],
        required:true
    },
    Category:{
        type:String,
        requried:true
    },
    });
module.exports = user = mongoose.model("Services", ServicesSchema);