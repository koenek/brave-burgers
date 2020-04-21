const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  // date
  reservationDate: {
    type: Date,
    required: [true, 'A reservation must have a date'],
  },
  // time
  reservationTime: {
    type: String,
    required: [true, 'A reservation must have a time'],
  },
  // guests
  guests: {
    type: Number,
    required: [true, 'A reservation must have an amount of guests'],
  },
  // email
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    lowercase: true,
  },
  // telnr.
  telNum: {
    type: Number,
    required: [true, 'Please provide a phone number'],
  },
  // comments
  comments: String,
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
