const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema
const MessagesSchema = new Schema({
    
    SenderId: 
        {
            type: Schema.Types.ObjectId, ref: 'Users'
        }
    ,
    ReceiverId: 
        {
            type: Schema.Types.ObjectId, ref: 'Users'
        }
    ,
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