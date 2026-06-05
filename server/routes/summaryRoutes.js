import express from "express";
import * as summaryController from "../controller/summaryController.js";
import * as authController from "../controller/authController.js";

const router = express.Router();
router.use(authController.protect);

router.get("/today", summaryController.dailySummary);

export default router;
