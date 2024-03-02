require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async ({ name, email, eventname, eventdate, eventtime, ticketprice, qr }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Ticket Purchase Confirmation',
    text: `Hello ${name},\n\nThank you for purchasing a ticket to ${eventname} on ${eventdate} at ${eventtime}. The price of the ticket is LKR. ${ticketprice}.\n\nBest regards,\n EventGo`,
    html: `<p>Hello ${name},</p><p>Thank you for purchasing a ticket to ${eventname} on ${eventdate} at ${eventtime}. The price of the ticket is LKR. ${ticketprice}.</p><p>Best regards,<br>Your Event Platform</p><img src="data:image/png;base64,${qr}" alt="QR Code"/>`,

  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

module.exports = {sendEmail};