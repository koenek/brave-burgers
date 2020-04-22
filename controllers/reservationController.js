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
    });
  }
};

exports.createReservation = async (req, res) => {
  try {
    const newReservation = await Reservation.create(req.body);
    console.log(newReservation);
    console.log(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        newReservation,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
    });
  }
};
