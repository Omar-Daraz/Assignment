import functions from "../functions";
import {UserData} from "../models/interfaces";
import {User} from "../models/schemas";
import crypto from "crypto";
import jwt from "jsonwebtoken";
const createUser = async (data: UserData) => {
  try {
    const user = await functions.createAndSave(data);
    if (!user) return "User Not Created";
    return user;
  } catch (error) {
    return error;
  }
};

const logInUser = async (data: UserData) => {
  try {
    const {email, password} = data;
    const hashedPassword = crypto
      .createHash("sha1")
      .update(password)
      .digest("hex");

    const user = await User.findOne({email, password: hashedPassword});
    if (!user) return "User Not Found";

    const token = jwt.sign(
      {user_id: user._id, email},
      process.env.TOKEN_KEY as string,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;
    return token;
  } catch (error) {
    return error;
  }
};

const findUser = async () => {
  try {
    const user = await User.find().select("-password -token");
    if (!user) return "invalid user id";
    return user;
  } catch (error) {
    return error;
  }
};

const userService = {
  createUser,
  logInUser,
  findUser,
};

export default userService;
