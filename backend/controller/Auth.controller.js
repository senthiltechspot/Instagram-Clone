const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const { sendOTP } = require("../utils/Nodemailer");

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const OTP = Math.floor(100000 + Math.random() * 900000).toString();
    // Check/Find User
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      // Save OTP in database
      const user = new User({ email, otp: OTP, username: Date.now() });
      await user.save();

      // Send OTP to user's email
      await sendOTP(OTP, email);
      return res.status(200).send({ message: "OTP sent successfully" });
    } else {
      user.otp = OTP;
      await user.save();

      await sendOTP(OTP, email);
      return res.status(200).send({ message: "OTP sent successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, OTP } = req.body;

    // Retrieve OTP from database
    // Find User
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send({ message: "No User Found" });
    }
    if (user.otp !== OTP) {
      return res.status(401).send({ message: "Invalid OTP" });
    } else {
      const token = jwt.sign(
        { userId: user._id, username: user.username, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "10d",
        }
      );
      res.send({ token });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};
