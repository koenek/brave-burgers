import '@babel/polyfill';
import { makeReservation, directBack } from './reservation';
import { calendar, getReserveDate, checkDate } from './calendar';
import { sendEmail } from './email';

// DOM ELEMENTS
const reservationForm = document.getElementById('form--reservation');
const reservationConfirmedBtn = document.querySelector(
  '#btn-reservation-confirmed'
);
const reservationErrorBtn = document.querySelector('#btn-reservation-error');

const contactForm = document.getElementById('form--contact');

if (reservationForm) {
  reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // name

    const name = document.getElementById('name').value;

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
      name,
      reservationDate,
      reservationTime,
      guests,
      email,
      telNum,
      comments
    );
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = document.querySelector('#contact-name').value;
    let email = document.querySelector('#contact-email').value;
    let comments = document.querySelector('#contact-comments').value;

    sendEmail(name, email, comments);
  });
}

// Add event listener for reservation calendar
window.addEventListener('load', calendar());

if (reservationConfirmedBtn) {
  reservationConfirmedBtn.addEventListener('click', directBack);
}

reservationErrorBtn.addEventListener('click', directBack);

// Popover for menu on smaller screens. Added ':visible' to prevent error in console
$('.navbar-toggler:visible')
  .popover({
    placement: 'bottom',
    content: 'Klik voor menu',
  })
  .popover('show');
