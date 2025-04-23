// src/routes/user.routes.ts
import { Router } from 'express';
import { getProfile, deleteUser } from '../controllers/user.controller';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();

router.get('/me', authenticateJWT, getProfile);

router.delete('/:id', authenticateJWT, deleteUser);

export default router;
