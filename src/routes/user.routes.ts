import express, {Router} from "express";

import {
  createUserRequest,
  findByIdRequest,
  logInUserRequest,
} from "../controllers/user.controller";
import { checkAuthorization } from "../middlewares";

const userRoutes: Router = express.Router();

userRoutes.route("/register").post(createUserRequest);
userRoutes.route("/login").post(logInUserRequest);
userRoutes.route("/user").all(checkAuthorization).get(findByIdRequest);


export default userRoutes;
