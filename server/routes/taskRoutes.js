import express from "express";
import * as authController from "../controller/authController.js";
import * as taskController from "../controller/taskController.js";
import * as timelogController from "../controller/timelogController.js";

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .post(taskController.createTask)
  .get(taskController.getAllTasks);

router
  .route("/:id")
  .get(taskController.getTask)
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

router.route("/:taskId/timelogs").get(timelogController.getTaskTimeLogs);
router.route("/generate").post(taskController.generateTask);

export default router;
