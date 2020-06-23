import { Request, Response } from 'express';

export const authorization = (req: Request, res: Response, next: any) => {
  if (req.user) {
    next();
  } else {
    res.send({ success: true, auth: false, data: undefined });
  }
};

export const userAuthMiddleware = [authorization];
