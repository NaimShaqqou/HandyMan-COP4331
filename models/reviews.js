const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema
const ReviewsSchema = new Schema({
    ReviewId: {
        type: Number
    },
    ServiceId: {
        type: Number
    },
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