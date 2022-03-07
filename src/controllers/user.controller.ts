import {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import {UserData} from "../models/interfaces";
import {userService} from "../services";

const createUserRequest = async (req: Request, res: Response) => {
  try {
    const createdUser = await userService.createUser(req.body as UserData);
    return res.status(StatusCodes.CREATED).json(createdUser);
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json(err);
  }
};

const logInUserRequest = async (req: Request, res: Response) => {
  try {
    const user = await userService.logInUser(req.body as UserData);
    return res.status(StatusCodes.OK).json(user);
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json(err);
  }
};

const findByIdRequest = async (req: Request, res: Response) => {
  try {
    const user = await userService.findUser();
    return res.status(StatusCodes.OK).json(user);
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json(err);
  }
};

export {createUserRequest, logInUserRequest, findByIdRequest};
