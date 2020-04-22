const path = require('path');
const express = require('express');

const viewRouter = require('./routes/viewRoutes');
const reservationRouter = require('./routes/reservationRoutes');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Body parser for reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Routes
app.use('/', viewRouter);
app.use('/reservations', reservationRouter);

module.exports = app;
