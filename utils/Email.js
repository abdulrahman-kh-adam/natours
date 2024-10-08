const nodemailer = require('nodemailer');
const pug = require('pug');
// const htmlToText = require('html-to-text');
const sgMail = require('@sendgrid/mail');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `${process.env.EMAIL_FROM}`;
  }

  createTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async send(template, subject) {
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject
      }
    );

    if (process.env.NODE_ENV === 'production') {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: this.to,
        from: this.from,
        subject,
        html
      };
      await sgMail.send(msg);
    } else {
      const mailOptions = {
        from: this.from,
        to: this.to,
        subject,
        html
      };
      await this.createTransport().sendMail(mailOptions);
    }
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours Family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
};
