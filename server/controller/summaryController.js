import Task from "../model/taskModel.js";
import TimeLog from "../model/timelogModel.js";

export const dailySummary = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Timelogs created today
    const timeLogs = await TimeLog.find({
      user: userId,
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).populate("task");

    const workedTaskIds = [
      ...new Set(
        timeLogs
          .filter((log) => log.task)
          .map((log) => log.task._id.toString()),
      ),
    ];

    const workedTasks = await Task.find({
      _id: { $in: workedTaskIds },
    });

    const totalTimeTracked = timeLogs.reduce(
      (total, log) => total + log.duration,
      0,
    );

    const completedTasks = await Task.find({
      user: userId,
      status: "completed",
    });

    const pendingTasks = await Task.find({
      user: userId,
      status: {
        $in: ["pending", "in-progress"],
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        date: startOfDay.toISOString().split("T")[0],
        tasksWorkedOn: workedTasks.length,
        workedTasks,
        totalTimeTracked,
        completedTasks,
        pendingTasks,
      },
    });
  } catch (error) {
    next(error);
  }
};
