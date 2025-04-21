// src/app.ts
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import path from "node:path";

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

export default app;
