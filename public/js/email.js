import axios from 'axios';
import { validateEmail } from './validate';
import { DocumentQuery } from 'mongoose';

// DOM ELEMENTS
const sendEmailBtn = document.querySelector('#btn-contact');
const sendEmailBtnProcessing = document.querySelector(
  '#btn-contact-processing'
);
const contactContainer = document.querySelector('.contact-container');
const contactConfirm = document.querySelector('.confirm-contact');
const contactError = document.querySelector('.error-contact');

const nameInput = document.querySelector('#contact-name');
const emailInput = document.querySelector('#contact-email');
const commentInput = document.querySelector('#contact-comments');

export const sendEmail = async (sender, email, comments) => {
  sendEmailBtn.classList.add('d-none');
  sendEmailBtnProcessing.classList.remove('d-none');
  try {
    const res = await axios({
      method: 'POST',
      url: '/sendemail',
      data: {
        sender,
        email,
        comments,
      },
    });

    if (res.data.status === 'success') {
      // Show confirmation message
      contactContainer.classList.add('d-none');
      contactConfirm.classList.remove('d-none');
    }
  } catch (err) {
    console.log(err);
    sendEmailBtn.classList.add('d-none');
    sendEmailBtnProcessing.classList.remove('d-none');
    // Show error message
    contactContainer.classList.add('d-none');
    contactError.classList.remove('d-none');
  }
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
