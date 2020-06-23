import express from 'express';
import { Application } from 'express';
import mongoose from 'mongoose';

class App {
  public app: Application;
  public port: number;
  public init: any;

  constructor(appInit: {
    port: number;
    middleWares: any;
    routers: any;
    models: any;
    services: any;
  }) {
    this.app = express();
    this.port = appInit.port;
    this.init = appInit;

    this.middlewares(appInit.middleWares);
    this.routes(appInit.routers);
    this.assets();
    this.template();
  }

  private models(models: any[]) {
    models.forEach((model) => {
      model();
    });
  }

  private services(services: any[]) {
    services.forEach((service) => {
      service();
    });
  }

  private middlewares(middleWares: any[]) {
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }

  private routes(controllers: any[]) {
    controllers.forEach((controller) => {
      this.app.use('/api', controller.router);
    });
  }

  private assets() {
    // this.app.use(express.static('public'));
    // this.app.use(express.static('views'));
  }

  private template() {
    console.log('We are not using any templates');
    // this.app.set('view engine', 'pug');
  }

  public listen() {
    mongoose
      .connect('mongodb://127.0.0.1:27017/expense')
      .then((mongo) => {
        if (mongo) {
          console.log(mongo);
          this.models(this.init.models);
          this.services(this.init.services);
          this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`);
          });
        }
      })
      .catch(() => {
        console.log('db connection failed');
      });
  }
}

export default App;
