import express from "express";
import * as authController from "../controller/authController.js";
import * as taskController from "../controller/taskController.js";

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

export default router;
