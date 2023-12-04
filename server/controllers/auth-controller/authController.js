import validator from "validator";

import User from "../../model/User.js";
import {
  generateAuthToken,
  generateOTP,
  maskPassword,
} from "../../services/authService.js";
import bcryptjs from "bcryptjs";
import { sendEmail } from "../../services/emailService.js";

import crypto from "crypto";

export const registerController = async (req, res) => {
  const { firstName, lastName, email, password, phone, profilePhoto } =
    req.body;
  try {
    if (!firstName) {
      throw new Error("Please enter first name");
    }
    if (!lastName) {
      throw new Error("Please enter last name");
    }
    if (!email) {
      throw new Error("Please enter email");
    }
    if (!password) {
      throw new Error("Please enter password");
    }
    if (!phone) {
      throw new Error("Please enter phone no.");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Please enter valid email");
    }

    const isExistingUser = await User.findOne({ email }).exec();
    if (isExistingUser) {
      throw new Error("Email already exists");
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const isValidPassword = regex.test(password);
    if (!isValidPassword) {
      throw new Error(
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long"
      );
    }

    if (phone.length !== 10) {
      throw new Error("Phone number should be 10 digits long");
    }

    let user = new User(req.body);

    user.password = await maskPassword(password);
    user = await user.save();

    let subject = `Welcome to Husky Bites!`;
    let text = `Hello ${user.firstName},  We are excited to have you aboard!`;
    let content = `<h4>Hello ${user.firstName}, </ph4> <div><h6>We are excited to have you aboard<h6></div> <br> <br> <h6>From <br> Husky Bites </h6>`;
    sendEmail(user.email, subject, text, content);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log("Error while registering user. ", error);
    res.status(500).json({
      success: false,
      message: "Failed to register user",
      error: error.message,
    });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) {
      throw new Error("Please enter email");
    }
    if (!password) {
      throw new Error("Please enter password");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Please enter valid email");
    }

    const isExistingUser = await User.findOne({ email }).exec();
    if (!isExistingUser) {
      throw new Error("Email is not registered");
    }

    const isMatch = await bcryptjs.compare(password, isExistingUser.password);
    if (!isMatch) {
      throw new Error("Password not matching");
    }

    const token = generateAuthToken(isExistingUser._id);

    res.status(200).json({
      success: true,
      message: "User logged successfully",
      user: isExistingUser,
      token: token,
    });
  } catch (error) {
    console.log("Error while logging user ", error);
    res.status(500).json({
      success: false,
      message: "Failed to login user",
      error: error.message,
    });
  }
};

export const generateOtpController = async (req, res) => {
  const { email } = req.body;

  try {

    if(!email){
      throw new Error("Please enter email");
    }

    const isExistingUser = await User.findOne({ email }).exec();
    if (!isExistingUser) {
      throw new Error("Email is not registered");
    }

    const otp = generateOTP(4);

    isExistingUser.otp = otp;
    await isExistingUser.save();

    let subject = `Forgot Password!`;
    let text = `Hello ${isExistingUser.firstName},  Your otp to generate new password is ${otp}`;
    let content = `<h4>Hello ${isExistingUser.firstName}, </ph4> <div><h6>Please find your otp below to generate new password<h6></div> <br> <h2>${otp}</h2> <br> <h6>From <br> Husky Bites </h6>`;
    sendEmail(isExistingUser.email, subject, text, content);

    res.status(201).json({
      success: true,
      message: "Otp sent successfully",
    });
  } catch (error) {
    console.log("Error while generating otp ", error);
    res.status(401).json({
      success: false,
      message: "Failed to generate otp",
      error: error.message,
    });
  }
};

export const createNewPasswordController = async (req, res) => {
  const { otp, password, email } = req.body;

  try {
    if (!email) {
      throw new Error("Please enter email");
    }
    if (!otp) {
      throw new Error("Please enter otp");
    }
    if (!password) {
      throw new Error("Please enter new password");
    }


    let user = await User.findOne({ email }).exec();
    if (!user) {
      throw new Error("Something went wrong");
    }

    if(otp !== user.otp){
      throw new Error("Invalid Otp");
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const isValidPassword = regex.test(password);
    if (!isValidPassword) {
      throw new Error(
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long"
      );
    }

    user.password = await maskPassword(password);
    user.otp = "";
    user = await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
      user: user,
    });

  } catch (error) {
    console.log("Error while creating new password", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate otp",
      error: error.message,
    });
  }
};

export const getCurrentUserController = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "User authenticated successfully",
      user: req.user,
      token: req.token,
    });
  } catch (error) {
    console.log("Error while registering user. ", error);
    res.status(500).json({
      success: false,
      message: "Failed to authenticate user",
      error: error.message,
    });
  }
};
