import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';
import configUpload from './config/upload';
import AppError from './errors/AppError';
import './database';

const app = express();
app.use(express.json());
app.use('/files', express.static(configUpload.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'Error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'Erro',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
