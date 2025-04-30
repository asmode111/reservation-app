import { Request, Response, NextFunction } from 'express';

const auth = function(req: Request, res: Response, next: NextFunction) {
  const isValidUser: boolean = true;

  if (isValidUser) {
    next();
  } else {
    res.status(401).json({ 
      status : "error",
      message: 'Unauthorized.',
      details: {},
    })
  }
}

export default auth;