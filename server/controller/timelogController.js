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

export const stopTimeLog = async (req, res) => {
  try {
    const timeLog = await TimeLog.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!timeLog) {
      return res.status(404).json({
        status: "fail",
        message: "Time log not found",
      });
    }

    if (timeLog.endTime) {
      return res.status(400).json({
        status: "fail",
        message: "Timer already stopped",
      });
    }

    const endTime = new Date();

    const duration = Math.floor((endTime - timeLog.startTime) / 1000);

    timeLog.endTime = endTime;
    timeLog.duration = duration;

    await timeLog.save();

    res.status(200).json({
      status: "success",
      data: {
        timeLog,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

export const getAllTimeLogs = async (req, res) => {
  try {
    const timeLogs = await TimeLog.find({
      user: req.user._id,
    }).populate("task", "title status");

    res.status(200).json({
      status: "success",
      results: timeLogs.length,
      data: {
        timeLogs,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

export const getTaskTimeLogs = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.taskId,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
    }

    const timeLogs = await TimeLog.find({
      task: req.params.taskId,
      user: req.user._id,
    });

    res.status(200).json({
      status: "success",
      results: timeLogs.length,
      data: {
        timeLogs,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
