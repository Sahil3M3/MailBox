const mongoose = require("mongoose");

const mailSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,      
    lowercase: true,
    trim: true
  },
  from: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  to: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  subject: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  read: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    enum: ["inbox", "sent"],   
    required: true
  }
});

const Mail = mongoose.model("Mail", mailSchema);

module.exports = Mail;
