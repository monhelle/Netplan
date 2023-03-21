const mongoose = require("mongoose");



const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Please enter an question'],
    unique: true,
    lowercase: true,
  },
  answer: {
    type: String,
    required: [true, 'Please enter an answer'],
  }
});

const Questions = mongoose.model("qa", questionSchema);

module.exports = Questions;
