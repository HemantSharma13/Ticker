import express from "express";
import * as authController from "../controller/authController.js";
import * as taskController from "../controller/taskController.js";
import * as timelogController from "../controller/timelogController.js";

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .post(authController.restrict("user"), taskController.createTask)
  .get(authController.restrict("user"), taskController.getAllTasks);

router
  .route("/:id")
  .get(authController.restrict("user"), taskController.getTask)
  .patch(authController.restrict("user"), taskController.updateTask)
  .delete(authController.restrict("user"), taskController.deleteTask);

router
  .route("/:taskId/timelogs")
  .get(authController.restrict("user"), timelogController.getTaskTimeLogs);
router
  .route("/generate")
  .post(authController.restrict("user"), taskController.generateTask);

export default router;
