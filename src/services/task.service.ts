import functions from "../functions";
import {TaskData} from "../models/interfaces";
import {Task} from "../models/schemas";

const createTask = async (data: TaskData) => {
  try {
    const task = await functions.createAndSaveTask(data);
    if (!task) return "Task Not Created";
    return task;
  } catch (error) {
    return error;
  }
};

const findTask = async () => {
  try {
    const taskI = await Task.find();
    if (!taskI) return "invalid Task id";
    return taskI;
  } catch (error) {
    return error;
  }
};

const taskService = {
  createTask,
  findTask,
};

export default taskService;
