const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: [true, 'An e-mail needs a sender'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your e-mail'],
    lowercase: true,
  },
  comments: {
    type: String,
    required: [true, 'An e-mail needs to have a body'],
  },
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;
