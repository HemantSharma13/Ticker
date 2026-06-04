import Timelog from "../model/timelogModel.js";
import Task from "../model/taskModel.js";

export const startTimeLog = async (req, res) => {
  try {
    const { taskId } = req.body;

    const task = await Task.findOne({
      _id: taskId,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
    }

    const timeLog = await TimeLog.create({
      task: taskId,
      user: req.user._id,
      startTime: new Date(),
    });

    res.status(201).json({
      status: "success",
      data: {
        timeLog,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
