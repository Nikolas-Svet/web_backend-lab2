// src/models/course.model.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ICourse extends Document {
    title: string;
    slug: string;
    description?: string;
    price: number;
    image: string;
    category: string;
    level: string;
    published: boolean;
    author: string;
    createdAt: string;
}

const CourseSchema: Schema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    published: { type: Boolean, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, required: true },
})

export default  mongoose.model<ICourse>('Course', CourseSchema);
