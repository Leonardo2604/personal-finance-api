import { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import bodyParser from 'body-parser';
import Database from './database';
import AppProvider from './shared/container';
import Routes from './routes';
import ErrorHandlerMiddleware from './middlewares/errorHandlerMiddleware';

class App {
  static async init(server: Express) {
    await App.connectToDatabase();
    App.loadProviders();
    App.loadMiddlewares(server);
    App.loadRoutes(server);
    App.loadErrorHandler(server);
  }

  static async connectToDatabase() {
    await Database.connect();
  }

  static loadMiddlewares(server: Express) {
    server.use(cors());
    server.use(helmet());
    server.use(bodyParser.json());
  }

  static loadRoutes(server: Express) {
    const routes = Routes.getRoutes();
    server.use(routes);
  }

  static loadProviders() {
    AppProvider.register();
  }

  static loadErrorHandler(server: Express) {
    const errorHandler = new ErrorHandlerMiddleware();
    server.use(errorHandler.handle);
  }
}

export default App;
