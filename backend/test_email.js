const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'techquantum.india@gmail.com',
    pass: 'ecwqsjvsznegkyfg'
  }
});

const mailOptions = {
  from: 'techquantum.india@gmail.com',
  to: 'techquantum.india@gmail.com',
  subject: 'Test Email from Nodemailer',
  text: 'If you receive this, Nodemailer is working!'
};

console.log('Sending email...');
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error occurred:', error.message);
  } else {
    console.log('Email sent successfully!');
    console.log('Message ID:', info.messageId);
  }
});
