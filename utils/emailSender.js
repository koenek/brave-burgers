const nodemailer = require('nodemailer');
const pug = require('pug');
const moment = require('moment');

moment.locale('nl');

module.exports = class EmailSender {
  constructor(reservation) {
    this.to = reservation.email;
    this.firstName = reservation.name.split(' ')[0];
    this.date = moment(reservation.reservationDate).format('dddd' + ' ' + 'LL');
    this.time = reservation.reservationTime;
    this.guests = reservation.guests;
    this.comments = reservation.comments;
    this.from = `Brave-Burgers <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      date: this.date,
      time: this.time,
      guests: this.guests,
      comments: this.comments,
      subject,
    });
    // console.log(
    //   this.firstName,
    //   this.date,
    //   this.time,
    //   this.guests,
    //   this.comments
    // );
    // 2) Define the email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendConfirmReservation() {
    await this.send('confirm_reservation', 'Uw reservering bij Brave Burgers');
  }
};

// module.exports = class EmailReceiver {
//   constructor(receivedEmail) {
//     this.to = process.env.EMAIL_TO;
//     this.from = receivedEmail.email;
//     this.firstName = receivedEmail.sender.split(' ')[0];
//     this.fullName = receivedEmail.sender;
//     this.comments = receivedEmail.comments;
//     this.momentReceived = moment().format('LLLL');
//   }

//   newTransport() {
//     if (process.env.NODE_ENV === 'production') {
//       // Sendgrid
//       return nodemailer.createTransport({
//         service: 'SendGrid',
//         auth: {
//           user: process.env.SENDGRID_USERNAME,
//           pass: process.env.SENDGRID_Password,
//         },
//       });
//     }

//     return nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: process.env.EMAIL_PORT,
//       auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });
//   }

//   async send(template, subject) {
//     // 1) Render HTML based on a pug template
//     const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
//       subject,
//     });
//     console.log(
//       this.to,
//       this.from,
//       this.firstName,
//       this.fullName,
//       this.comments,
//       this.momentReceived
//     );
//     // 2) Define the email options
//     const mailOptions = {
//       from: this.from,
//       to: this.to,
//       subject,
//       html,
//     };

//     // 3) Create a transport and send email
//     await this.newTransport().sendMail(mailOptions);
//   }

//   async sendReceivedEmail() {
//     await this.send(
//       'received_email',
//       `Webform: ${this.fullName} - ${this.comments.substring(0, 30)}...`
//     );
//   }
// };
