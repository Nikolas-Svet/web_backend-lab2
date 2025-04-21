// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import User, { IUser } from '../models/user.model';

// Получение данных о себе (уже исправлено)
export const getProfile = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'Пользователь не авторизован' });
      return;
    }

    const user: IUser | null = await User.findById(userId).select('-password');
    if (!user) {
      res.status(404).json({ message: 'Пользователь не найден' });
      return;
    }
    res.json(user);
  } catch (error) {
    console.error('Ошибка получения профиля:', error);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};

// Удаление пользователя (жёсткое удаление)
export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const user: IUser | null = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({ message: 'Пользователь не найден' });
      return;
    }
    res.json({ message: 'Пользователь удалён' });
  } catch (error) {
    console.error('Ошибка удаления пользователя:', error);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};
