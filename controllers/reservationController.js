const Reservation = require('../models/reservationModel');

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();

    res.status(200).json({
      status: 'success',
      results: reservations.length,
      data: {
        reservations,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.createReservation = async (req, res) => {
  try {
    const newReservation = await Reservation.create(req.body);
    newReservation.telNum = '+31' + newReservation.telNum;

    res.status(201).json({
      status: 'success',
      data: {
        newReservation,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
