import axios from 'axios';
import { validateEmail, validatePhone } from './validate';

// DOM ELEMENTS
const reservationBtn = document.querySelector('#btn-reservation');
const reservationBtnProcessing = document.querySelector(
  '#btn-reservation-processing'
);
const confirmReservation = document.querySelector('.confirm-reservation');
const confirmationContainer = document.querySelector('.confirmation-container');
const errorContainer = document.querySelector('.error-reservation');

const emailInput = document.getElementById('email');
const telInput = document.getElementById('tel');

export const makeReservation = async (
  name,
  reservationDate,
  reservationTime,
  guests,
  email,
  telNum,
  comments
) => {
  reservationBtn.classList.add('d-none');
  reservationBtnProcessing.classList.remove('d-none');
  try {
    const res = await axios({
      method: 'POST',
      url: '/reservations',
      data: {
        name,
        reservationDate,
        reservationTime,
        guests,
        email,
        telNum,
        comments,
      },
    });

    if (res.data.status === 'success') {
      // Show spinner
      // reservationBtn.classList.add('d-none');
      // reservationBtnProcessing.classList.remove('d-none');
      // window.setTimeout(() => {
      //   location.assign('/');
      // }, 3000);
      confirmationContainer.classList.add('d-none');
      confirmReservation.classList.remove('d-none');
    }
  } catch (err) {
    console.log(err);
    // Show spinner
    reservationBtn.classList.add('d-none');
    reservationBtnProcessing.classList.remove('d-none');
    confirmationContainer.classList.add('d-none');
    errorContainer.classList.remove('d-none');
  }
};

export const directBack = () => {
  location.assign('/');
};

emailInput.addEventListener('input', (e) => {
  e.preventDefault();
  if (validateEmail(emailInput.value)) {
    emailInput.setCustomValidity('');
  } else {
    emailInput.setCustomValidity(
      "Voer een geldig e-mailadres in. Een e-mailadres moet onder anderen een '@' en een '.' bevatten"
    );
  }
});

telInput.addEventListener('input', (e) => {
  e.preventDefault();
  if (validatePhone(telInput.value)) {
    telInput.setCustomValidity('');
  } else {
    telInput.setCustomValidity(
      'Voer een telefoonnummer in zonder spaties. Het telefoonnummer dient te beginnen met 1 van de opties: 0031, +31 of 0. Mobiele en vaste nummers zijn beiden mogelijk'
    );
  }
});
