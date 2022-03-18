const mongoose = require("mongoose");
const services = require("./services");
const Schema = mongoose.Schema;
//Create Schema
const RequestedServicesSchema = new Schema({
    
    RequestedId: [
        {
            type: Schema.Types.ObjectId, ref: 'Users'
        }
    ],
    ServiceId: [
        {
            type: Schema.Types.ObjectId, ref: 'Services'
        }
    ],
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