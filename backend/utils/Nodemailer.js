const nodemailer = require("nodemailer");

const sendOTP = async (OTP, email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "OTP for login - InstaGram Clone SenthilTechSpot",
      text: `Your OTP for login is ${OTP}`,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error(err);
    return;
  }
};

module.exports = { sendOTP };
