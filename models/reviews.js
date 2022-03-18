const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema
const ReviewsSchema = new Schema({
    UserId: [
        {
            type: Schema.Types.ObjectId, ref: 'Users'
        }
    ],
    ServiceId: [
        {
            type: Schema.Types.ObjectId, ref: 'Services'
        }
    ],
    ProfilePictureOfReviewer: {
        type: Image,
        required: true
    },
    ReviewText: {
        type: String,
        required: true
    },
    });
module.exports = user = mongoose.model("Reviews", ReviewsSchema);