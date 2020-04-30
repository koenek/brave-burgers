const nodemailer = require('nodemailer');
const pug = require('pug');

module.exports = class Email {
  constructor(reservation) {
    this.to = reservation.email;
    this.firstName = reservation.name.split(' ')[0];
    this.date = reservation.date;
    this.time = reservation.time;
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
          pass: process.env.SENDGRID_Password,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
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
      subject,
    });
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
    await this.send('baseEmail', 'Uw reservering bij Brave Burgers');
  }
};
