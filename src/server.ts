import App from './app';

import * as bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import passport from 'passport';

import loggerMiddleware from './middleware/loggerMiddleware';

import Route from './routes/routes';
import passportService from './services/auth/passport';

import MongooseMode from './models/user-models/user-account-model';
// import HomeController from './controllers/home/home.controller'

const app = new App({
  port: 5000,
  routers: [new Route()],
  middleWares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: ['secret'],
    }),
    loggerMiddleware,
    passport.initialize(),
    passport.session(),
  ],
  models: [MongooseMode],
  services: [passportService],
});

app.listen();
