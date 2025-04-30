import { Request, Response } from 'express';

export const getMain = async (req: Request, res: Response) => {
  res.send('Welcome to the app!');
};