import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.get('/', (req: Request, res: Response): void => {
  res.status(200).send('Hello world');
});

export default app;
