const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendViolationEmail = (email) => {
  const mailOptions = {
    from: `SocialHub ${process.env.EMAIL_USER}`,
    to: email,
    subject: "Content Violation Alert",
    html: `<p>Your recent post was flagged for violating our community guidelines. Please review our policies before posting again.</p>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = sendViolationEmail;
