const express = require('express');

const reservationRouter = require('./routes/reservationRoutes');

const app = express();

// Body parser for reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use('/', reservationRouter);

module.exports = app;
