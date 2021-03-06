const nodemailer = require('nodemailer');
const pug = require('pug');
const moment = require('moment');

moment.locale('nl');

module.exports = class EmailReceiver {
  constructor(receivedEmail) {
    this.to = process.env.EMAIL_TO;
    this.from = process.env.EMAIL_FROM;
    this.senderEmail = receivedEmail.email;
    this.firstName = receivedEmail.sender.split(' ')[0];
    this.fullName = receivedEmail.sender;
    this.comments = receivedEmail.comments;
    this.momentReceived = moment().format('LLLL');
    this.mailto = `mailto:${this.senderEmail}`;
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
      fullName: this.fullName,
      from: this.from,
      senderEmail: this.senderEmail,
      comments: this.comments,
      momentReceived: this.momentReceived,
      mailto: this.mailto,
      subject,
    });
    // console.log(firstName, fullName, from, comments, momentReceived);
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

  async sendReceivedEmail() {
    await this.send(
      'received_email',
      `Brave Burgers Webform: ${this.fullName} - ${this.comments.substring(
        0,
        30
      )}...`
    );
  }
};
