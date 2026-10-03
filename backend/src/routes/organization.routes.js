import express from "express";
const router = express.Router();

import OrganizationController from "../controllers/organization.controller.js";
// import { jwtAuthMiddleware } from "../middlewares/jwt.middleware.js";

// router.use(jwtAuthMiddleware);

router.post('/create', OrganizationController.create);
router.get('/fetch-org', OrganizationController.getAll);
router.get('/:id', OrganizationController.getById);
router.get('/get-by-name/:name', OrganizationController.getByOrganizationName);
router.put('/:id', OrganizationController.update);

export default router;