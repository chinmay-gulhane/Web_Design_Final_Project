import validator from "validator";

import User from "../model/User.js";
import { generateAuthToken, maskPassword } from "../services/authService.js";
import bcryptjs from "bcryptjs";

export const registerController = async (req, res) => {
  const { name, email, password, phone, profilePhoto } = req.body;
  try {
    if (!name) {
      throw new Error("Please enter name");
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
    if(!isMatch){
        throw new Error("Password not matching");
    }

    const token = generateAuthToken(isExistingUser._id);

    res.status(200).json({
        success: true,
        message: "User logged successfully",
        user: isExistingUser,
        token: token
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

export const getCurrentUserController = (req, res) => {

    try{
        res.status(200).json({
            success: true,
            message: "User authenticated successfully",
            user: req.user,
            token: req.token
        })
    }catch (error) {
    console.log("Error while registering user. ", error);
    res.status(500).json({
      success: false,
      message: "Failed to authenticate user",
      error: error.message,
    });
  }
}
