import express from "express";
import * as authController from "../controller/authController.js";
import * as taskController from "../controller/taskController.js";

const router = express.Router();

router.post("/", authController.protect, taskController.createTask);

export default router;
