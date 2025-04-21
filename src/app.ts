// src/app.ts
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import path from "node:path";
import {API_PREFIX} from "./utils/consts";

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());

app.use(`${API_PREFIX}auth`, authRoutes);
app.use(`${API_PREFIX}user`, userRoutes);

export default app;
