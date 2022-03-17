const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create Schema
const CardSchema = new Schema({
  UserId: {
    type: Number
  },
  Card: {
    type: String,
    required: true
  }
});

module.exports = Card = mongoose.model('Cards', CardSchema);
