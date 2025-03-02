const nodemailer = require("nodemailer");
const mailOptions = require("../utils/mailOptions");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendViolationEmail = (email) => {

  transporter.sendMail(mailOptions(email), (err, info) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = sendViolationEmail;
