import express from "express";
import * as authController from "../controller/authController.js";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.get("/me", authController.protect, authController.getMe);

export default router;
