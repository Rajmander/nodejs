import servicesController from "../controllers/servicesController.js";
import { validateAuthToken } from "../helpers/token.js";

import express from "express";
const router = express.Router();

router.post("/", validateAuthToken, servicesController.add);
router.put("/:id", validateAuthToken, servicesController.update);
router.get("/", validateAuthToken, servicesController.show);
router.delete("/:id", validateAuthToken, servicesController.delete);
export default router;
