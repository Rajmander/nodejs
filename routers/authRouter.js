import authController from "../controllers/authController.js";
import { validateAuthToken } from "../helpers/token.js";

import express from "express";
const router = express.Router();

router.post("/login", authController.login);
router.get("/show", validateAuthToken, authController.show);
export default router;
