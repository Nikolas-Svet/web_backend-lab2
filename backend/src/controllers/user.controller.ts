// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import User, { IUser } from '../models/user.model';
import {ErrorMessages} from "../utils/consts";

// Получение данных о себе (уже исправлено)
export const getProfile = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: ErrorMessages.GetInfoNotAuth });
      return;
    }

    const user: IUser | null = await User.findById(userId).select('-password');
    if (!user) {
      res.status(404).json({ message: ErrorMessages.NotFoundUser });
      return;
    }
    res.json(user);
  } catch (error) {
    console.error('Ошибка получения профиля:', error);
    res.status(500).json({ message: ErrorMessages.InternalServerError });
  }
};

// Удаление пользователя (жёсткое удаление)
export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const user: IUser | null = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({ message: ErrorMessages.NotFoundUser });
      return;
    }
    res.json({ message: ErrorMessages.delSuccessful });
  } catch (error) {
    console.error('Ошибка удаления пользователя:', error);
    res.status(500).json({ message: ErrorMessages.InternalServerError });
  }
};
