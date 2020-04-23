import axios from 'axios';

export const makeReservation = async (
  reservationDate,
  reservationTime,
  guests,
  email,
  telNum,
  comments
) => {
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
      // placeholder
      alert('processing your reservation');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    // placeholder
    alert(err);
    console.log(err);
    location.assign('/');
  }
};
