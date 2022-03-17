const mongoose = require("mongoose");
const services = require("./services");
const Schema = mongoose.Schema;
//Create Schema
const RequestedServicesSchema = new Schema({
    RSId: {
        type: Number
    },
    RequestedId: {
        type: Number
    },
    ServiceId: {
        type: Number
    },
    Completion: {
        type: Boolean,
        required: true
    },
    Price: {
        type: String,
        required: true
    },
    Dates: {
        type: Date,
        required:true
    },
    DescriptionFromRequester: {
        type: String,
        required:true
    },
    });
module.exports = user = mongoose.model("RequestedServices", RequestedServicesSchema);