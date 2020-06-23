import express from 'express';
import { IRouterInit } from '../interfaces/router/IRouterBase';
import AuthRoute from './auth-routes';

class Routes implements IRouterInit {
  public router = express.Router();
  constructor() {
    this.initRouters();
  }

  initRouters() {
    this.router.use('/auth', AuthRoute);
  }
}

export default Routes;
