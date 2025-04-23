// src/routes/course.routes.ts

import {Router} from "express";
import {authenticateJWT} from "../middleware/auth.middleware";
import {
    createCourse,
    deleteCourseById,
    getCourseById,
    getCourses,
    updateCourseById
} from "../controllers/course.controller";
import {upload} from "../middleware/upload.middleware";

const router = Router();

// CRUD для курсов
router.post(
    '/',
    authenticateJWT,
    upload.single('image'),
    createCourse
);
router.get('/', getCourses);
router.get('/:id', getCourseById);
router.put(
    '/:id',
    authenticateJWT,
    upload.single('image'),
    updateCourseById
);
router.delete(
    '/:id',
    authenticateJWT,
    deleteCourseById
);

export default router;