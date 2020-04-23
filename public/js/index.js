import '@babel/polyfill';
import { makeReservation } from './reservation';
import { calendar, getReserveDate } from './calendar';

// DOM ELEMENTS
const reservationForm = document.getElementById('form--reservation');

if (reservationForm) {
  reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // reservationDate

    let day = document.querySelector('.selected').innerHTML;
    let month = document.getElementById('curMonth').innerHTML;
    let year = document.getElementById('curYear').innerHTML;

    // get reservationDate in 2020-08-01 data format

    const reservationDate = getReserveDate(day, month, year);

    // reservationTime

    let reservationTime = document.getElementById('reservation--time').value;

    // guests
    const guests = document.getElementById('guests').value;
    // email
    const email = document.getElementById('email').value;
    // telNum
    const telNum = document.getElementById('tel').value;
    // comments
    const comments = document.getElementById('comments').value;

    makeReservation(
      reservationDate,
      reservationTime,
      guests,
      email,
      telNum,
      comments
    );
  });
}

// Add event listener for reservation calendar
window.addEventListener('load', calendar());
