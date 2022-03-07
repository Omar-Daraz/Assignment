import crypto from "crypto";
import {User} from "../models/schemas";
import {UserData} from "../models/interfaces";
import jwt from "jsonwebtoken";
const createAndSave = async (reqBody: UserData) => {
  const hashedPassword = crypto
    .createHash("sha1")
    .update(reqBody.password)
    .digest("hex");

  return await save({
    email: reqBody.email,
    password: hashedPassword,
  });
};

const save = async (userObj: UserData) => {
  try {
    const user = new User(userObj);

    const {password, ...responseUser} = user._doc;
    const token = jwt.sign(
      {user_id: user._id, responseUser},
      process.env.TOKEN_KEY as string,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;
    await user.save();
    return {user: responseUser};
  } catch (error) {
    return error;
  }
};

export {createAndSave};
