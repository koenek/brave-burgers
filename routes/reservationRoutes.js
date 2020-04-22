const express = require('express');
const reservationController = require('../controllers/reservationController');

const router = express.Router();

router
  .route('/reservations')
  .get(reservationController.getAllReservations)
  .post(reservationController.createReservation);

module.exports = router;
