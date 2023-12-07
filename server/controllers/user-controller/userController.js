import User from "../../model/User.js";

export const getUsersController = async (req, res) => {
  try {
    const users = await User.find({ role: "USER" }).exec();

    res.status(200).json({
      success: true,
      message: "",
      users
    });
  } catch (error) {
    console.log("Error while getting users. ", error);
    res.status(500).json({
      success: false,
      message: "Failed to get users",
      error: error.message,
    });
  }
};
