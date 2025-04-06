import cors from 'cors';
import express, {Application} from 'express';
import {CategoryRoute, ProductRoute} from '../Routes';
import {PaypalRoute} from '../Routes/PaypalRoute';

export default async(app: Application) => {
  app.use(express.json());
  app.use(cors())
  app.use(express.urlencoded({extended: true}))
  app.use('/assets', express.static('assets'));

  app.use('/category', CategoryRoute);
  app.use('/product', ProductRoute);
  app.use('/paypal', PaypalRoute);


  return app;
}
