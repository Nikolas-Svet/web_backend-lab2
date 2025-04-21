// src/routes/course.routes.ts

import {Router} from "express";
import {authenticateJWT} from "../middleware/auth.middleware";
import {deleteCourseById, getCourseById, getCourses, updateCourseById} from "../controllers/course.controller";

const router = Router();

router.get('/', authenticateJWT, getCourses)
router.get('/:id', authenticateJWT, getCourseById)
router.delete('/:id', authenticateJWT, deleteCourseById)
router.patch('/:id', authenticateJWT, updateCourseById)

export default router;