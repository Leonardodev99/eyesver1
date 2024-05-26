import dotenv from 'dotenv';

dotenv.config();

import './src/database';

import express from 'express';
import homeRoutes from './src/routes/homeRoutes';
import userRoutes from './src/routes/userRoutes ';
import tokenRoutes from './src/routes/tokenRoutes';
import AgenteRoutes from './src/routes/AgenteRoutes';
import tokenAgenteRoutes from './src/routes/tokenAgenteRoutes';
import denunciasRoutes from './src/routes/denunciasRoutes';



class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true}));
    this.app.use(express.json());

  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/agente/', AgenteRoutes);
    this.app.use('/tokenAgente/', tokenAgenteRoutes);
    this.app.use('/denuncias/', denunciasRoutes);
  }
}

export default new App().app;
