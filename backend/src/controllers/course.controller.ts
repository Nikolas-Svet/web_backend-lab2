import { Request, Response } from 'express';
import { ErrorMessages } from '../utils/consts';
import Course from '../models/course.model';
import mongoose from "mongoose";

export const getCourses = async (req: Request, res: Response) => {
    try {
        const {
            title,
            category,
            level,
            published,
            priceMin,
            priceMax,
            sort = '-createdAt',
            page = '1',
            limit = '10',
        } = req.query;

        // Фильтр по условиям
        const filter: any = {};

        if (title) {
            filter.title = { $regex: title, $options: 'i' };
        }

        if (category) filter.category = category;
        if (level) filter.level = level;
        if (published !== undefined) filter.published = published === 'true';

        if (priceMin || priceMax) {
            filter.price = {};
            if (priceMin) filter.price.$gte = Number(priceMin);
            if (priceMax) filter.price.$lte = Number(priceMax);
        }

        // Сортировка
        const sortBy: any = {};
        const sortFields = (sort as string).split(',');
        sortFields.forEach((field) => {
            const direction = field.startsWith('-') ? -1 : 1;
            const key = field.replace(/^[-+]/, '');
            sortBy[key] = direction;
        });

        // Пагинация
        const currentPage = parseInt(page as string, 10);
        const perPage = parseInt(limit as string, 10);
        const skip = (currentPage - 1) * perPage;

        const [courses, total] = await Promise.all([
            Course.find(filter).sort(sortBy).skip(skip).limit(perPage),
            Course.countDocuments(filter),
        ]);

        res.json({
            total,
            page: currentPage,
            pages: Math.ceil(total / perPage),
            data: courses,
        });
    } catch (error) {
        console.error('Ошибка получения курсов:', error);
        res.status(500).json({ message: ErrorMessages.InternalServerError });
    }
};

export const getCourseById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: ErrorMessages.ValidationId  });
            return;
        }

        const course = await Course.findById(id).select('-__v');

        if (!course) {
            res.status(404).json({ message: ErrorMessages.NotFoundCourse });
            return;
        }

        res.json(course);
    } catch (error) {
        console.error('Ошибка получения курса:', error);
        res.status(500).json({ message: ErrorMessages.InternalServerError });
    }
};

export const deleteCourseById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: ErrorMessages.ValidationId });
            return;
        }

        const course = await Course.findByIdAndDelete(id);

        if (!course) {
            res.status(404).json({ message: ErrorMessages.NotFoundCourse });
            return;
        }

        res.status(200).json({ message: ErrorMessages.CourseDelSuccessful });
    } catch (error) {
        console.error('Ошибка удаления курса:', error);
        res.status(500).json({ message: ErrorMessages.InternalServerError });
    }
};

export const updateCourseById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updates = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: ErrorMessages.ValidationId });
            return;
        }

        const updatedCourse = await Course.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });

        if (!updatedCourse) {
            res.status(404).json({ message: ErrorMessages.NotFoundCourse });
            return;
        }

        res.json(updatedCourse);
    } catch (error) {
        console.error('Ошибка обновления курса:', error);
        res.status(500).json({ message: ErrorMessages.InternalServerError });
    }
};
