import express, {Router} from "express";
import {
  createTaskRequest,
  findByIdRequest,
} from "../controllers/task.controller";

import {checkAuthorization} from "../middlewares";

const taskRoutes: Router = express.Router();

taskRoutes.route("/create").all(checkAuthorization).post(createTaskRequest);
taskRoutes.route("/listAll").all(checkAuthorization).get(findByIdRequest);

export default taskRoutes;
