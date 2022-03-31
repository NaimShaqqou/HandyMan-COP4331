const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ReviewsSchema = new Schema({
    UserId: 
        {
            type: Schema.Types.ObjectId, ref: 'Users'
        }
    ,
    ServiceId: 
        {
            type: Schema.Types.ObjectId, ref: 'Services'
        }
    ,
    ProfilePictureOfReviewer: {
        type: String,
        required: true,
        trim: true,
    },
    ReviewText: {
        type: String,
        required: true,
        trim: true,
    },
});

module.exports = reviewModel = mongoose.model("Reviews", ReviewsSchema);