import axios from 'axios';

// DOM ELEMENTS
const reservationBtn = document.querySelector('#btn-reservation');
const reservationBtnProcessing = document.querySelector(
  '#btn-reservation-processing'
);
const confirmReservation = document.querySelector('.confirm-reservation');
const confirmationContainer = document.querySelector('.confirmation-container');
const errorContainer = document.querySelector('.error-reservation');

export const makeReservation = async (
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
