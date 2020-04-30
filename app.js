const path = require('path');
const express = require('express');

const viewRouter = require('./routes/viewRoutes');
const reservationRouter = require('./routes/reservationRoutes');
const emailRouter = require('./routes/emailRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Body parser for reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Routes
app.use('/', viewRouter);
app.use('/reservations', reservationRouter);
app.use('/sendemail', emailRouter);

module.exports = app;
