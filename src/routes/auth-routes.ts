import * as express from 'express';

import { Request, Response } from 'express';
import passport from 'passport';
import { userAuthMiddleware } from '../services/auth/auth';
const router = express.Router();

router.get('/', [...userAuthMiddleware], (req: Request, res: Response) => {
  const users = [
    {
      id: 1,
      name: 'Ali',
    },
    {
      id: 2,
      name: 'Can',
    },
    {
      id: 3,
      name: 'Ahmet',
    },
  ];

  res.send({ users });
});
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

router.get('/logout', (req: Request, res: Response) => {
  req.logOut();
  res.send({ status: 'logout', user: req.user });
});

router.get(
  '/getUser',
  [...userAuthMiddleware],
  (req: Request, res: Response) => {
    res.send({ success: true, auth: true, data: req.user });
  }
);

export default router;
