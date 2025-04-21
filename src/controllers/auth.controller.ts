import { Request, Response } from 'express';
import User, { IUser } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, username, password, role } = req.body;

    if (!firstName || !lastName || !username || !password || !role) {
      res.status(400).json({ message: 'Все поля обязательны' });
      return;
    }

    if (!['student', 'teacher'].includes(role)) {
      res.status(400).json({ message: 'Роль должна быть student или teacher' });
      return;
    }

    const existingUser: IUser | null = await User.findOne({ username });
    if (existingUser) {
      res
        .status(400)
        .json({ message: 'Пользователь с таким логином уже существует' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      username,
      password: hashedPassword,
      role,
    });

    await user.save();

    res.status(201).json({ message: 'Пользователь зарегистрирован' });
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: 'Логин и пароль обязательны' });
      return;
    }

    const user: IUser | null = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ message: 'Неверный логин или пароль' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Неверный логин или пароль' });
      return;
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' },
    );

    res.json({ token });
  } catch (error) {
    console.error('Ошибка логина:', error);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};
