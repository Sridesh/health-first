const redisService = require("../../config/redis");
const generateOTP = require("../../helpers/generateOTP");
const nodemailer = require("nodemailer");
const { getUserByEmail } = require("../../models/patientModel");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.APP_PASSWORD,
  },
});

const setOTP = async (req, res) => {
  try {
    const { email } = req.body;

    console.log(email);

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (await getUserByEmail(email.toLowerCase())) {
      return res
        .status(409)
        .json({ message: "Email already registered. Try logging in." });
    }

    const otp = generateOTP();

    const mailOptions = {
      from: process.env.USER_MAIL,
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}`,
    };

    await redisService.storeOTP(email, otp);

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: "Error Occurred. Please try again" });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  console.log(email, typeof otp, otp);

  try {
    if (!email) {
      return res.status(400).json({ message: "Bad request. Try again" });
    }

    if (!otp || otp.length !== 6) {
      return res.status(400).json({ error: "Invalid OTP format" });
    }

    if (await redisService.isAccountLocked(email)) {
      return res.status(403).json({
        error:
          "Account locked due to too many failed attempts. Please try again later.",
      });
    }

    const isValid = await redisService.verifyOTP(email, otp);

    if (isValid) {
      // Clear failed attempts on successful verification
      await redisService.client.del(`failed:${redisService.hashKey(email)}`);

      return res.status(200).json({ message: "OTP verified successfully" });
    } else {
      // Track failed attempt
      await redisService.trackFailedAttempt(email);

      // Check if account should be locked after this attempt
      if (await redisService.isAccountLocked(email)) {
        return res.status(403).json({
          message:
            "Account locked due to too many failed attempts. Please try again later.",
        });
      } else {
        return res.status(401).json({ message: "Invalid OTP" });
      }
    }
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: "Error Occurred. Please try again" });
  }
};

module.exports = { setOTP, verifyOTP };
