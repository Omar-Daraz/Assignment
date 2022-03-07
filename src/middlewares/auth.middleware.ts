import {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import Jwt from "jsonwebtoken";

const checkAuthorization = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    var token: string = req.headers.authorization as string;
    token = token.replace("Bearer ", "");
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    const decoded = Jwt.verify(token, process.env.TOKEN_KEY as string);
    req.body.user = decoded;
    return next();
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Invalid Token");
  }
};

export default checkAuthorization;
