import categoryController from "../controllers/categoryController.js";
import { validateAuthToken } from "../helpers/token.js";

import express from "express";
const router = express.Router();

// Category Routers
router.post("/", validateAuthToken, categoryController.add);
router.put("/:categoryId", validateAuthToken, categoryController.update);
router.get("/", validateAuthToken, categoryController.show);
router.delete("/:categoryId", validateAuthToken, categoryController.delete);

// Service Routers
router.post(
  "/:categoryId/service",
  validateAuthToken,
  categoryController.addService
);
router.put(
  "/:categoryId/service/:serviceId",
  validateAuthToken,
  categoryController.updateService
);
router.get(
  "/:categoryId/services",
  validateAuthToken,
  categoryController.showService
);
router.delete(
  "/:categoryId/service/:serviceId",
  validateAuthToken,
  categoryController.deleteService
);

export default router;
