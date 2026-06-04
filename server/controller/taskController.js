import Task from "../model/taskModel.js";

export const createTask = async (req, res) => {
  if (!req.body.title) {
    res.status(400).json({
      status: "fail",
      message: "A task must have a title.",
    });
  }

  console.log("Req body inside createTask is:", req.body);

  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      user: req.user._id,
    });

    res.status(201).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user._id,
    });

    res.status(200).json({
      status: "success",
      results: tasks.length,
      data: {
        tasks,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
