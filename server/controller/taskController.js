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
