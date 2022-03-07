import {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import {TaskData} from "../models/interfaces";
import {taskService} from "../services";

const createTaskRequest = async (req: Request, res: Response) => {
  try {
    const createdTask = await taskService.createTask(req.body as TaskData);
    return res.status(StatusCodes.CREATED).json(createdTask);
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json(err);
  }
};

const findByIdRequest = async (req: Request, res: Response) => {
  try {
    const task = await taskService.findTask();
    return res.status(StatusCodes.OK).json(task);
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json(err);
  }
};

export {createTaskRequest, findByIdRequest};
