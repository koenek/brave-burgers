const Reservation = require('../models/reservationModel');
const EmailSender = require('../utils/emailSender');

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
  // let reservationDate = req.body.reservationDate;
  // console.log(reservationDate);
  // reservationDate = moment().utc().format();
  // console.log(reservationDate);
  // req.body.reservationDate = reservationDate;
  try {
    const newReservation = await Reservation.create(req.body);
    // newReservation.reservationDate = newReservation.reservationDate.setDate(
    //   newReservation.reservationDate.getDate() + 1
    // );

    // Make sure reservationDate is saved correctly
    newReservation.markModified('reservationDate');
    newReservation.save();

    await new EmailSender(newReservation).sendConfirmReservation();

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
    console.log(err);
  }
};
