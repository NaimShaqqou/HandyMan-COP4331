const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema
const MessagesSchema = new Schema({
    MessageId: {
        type: Number
    },
    SenderId: {
        type: Number
    },
    ReceiverId: {
        type: Number
    },
    Timestamp: {
        type: String,
        required: true
    },
    MessageText: {
        type: String,
        required: true
    },
    });
module.exports = user = mongoose.model("Messages", MessagesSchema);