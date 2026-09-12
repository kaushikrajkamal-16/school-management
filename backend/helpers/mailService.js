const nodemailer = require("nodemailer");
const { OTPMailTem } = require("./MailTemplate");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "kaushik.rajkamal@gmail.com",
    pass: "wjgx dhwk icaw rukb",
  },
});

const sendMail = async ({ to, subject, html, email, otp }) => {
  await transporter.sendMail({
    from: '"E-commerce" <team@E-commerce>',
    to: email,
    subject: subject,
    html: OTPMailTem(otp, subject),
  });
};

module.exports = { sendMail };
