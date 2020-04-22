const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Reservation = require('../../models/reservationModel');

dotenv.config({ path: '../../config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to Database'));

// READ JSON FILE
const reservations = JSON.parse(
  fs.readFileSync('./reservations.json', 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Reservation.create(reservations);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
