// src/routes/user.routes.ts
import { Router } from 'express';
import { getProfile, deleteUser } from '../controllers/user.controller';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();

// Получение данных о себе (требует авторизации)
router.get('/me', authenticateJWT, getProfile);

// Удаление пользователя (требует авторизации, можно добавить проверки прав)
router.delete('/:id', authenticateJWT, deleteUser);

export default router;
