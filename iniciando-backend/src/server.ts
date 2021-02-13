import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes/index';
import uploadConfig from './config/upload'
import AppError from './errors/AppErrors';

import './database';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory))
app.use(routes);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({ status: 'ERROR', message: error.message })
    }

    return response.status(500).json({
        status: 'ERROR',
        message: 'INTERNAL SERVER ERROR 🚫'
    })
})

app.listen(3333, () => console.log('The server is running at port 3333 🚀'));
