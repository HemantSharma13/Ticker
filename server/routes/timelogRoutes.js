import express from "express";
import { protect } from "../controllers/authController.js";
import * as timelogController from "../controller/timelogController.js";
import * as authController from "../controller/authController.js";

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .post(timelogController.startTimeLog)
  .get(timelogController.getAllTimeLogs);

router.patch("/:id/stop", timelogController.stopTimeLog);
router.delete("/:id", timelogController.deleteTimeLog);

export default router;
