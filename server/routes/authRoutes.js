import express from "express";
import * as authController from "../controller/authController.js";

const router = express.Router();

router.post("/signup", authController.signup);

export default router;
