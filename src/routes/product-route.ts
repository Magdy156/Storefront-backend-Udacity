import express, { Router } from 'express';
import { verifyTokenAuth } from '../services/auth';
import * as controller from '../controller/product-controller';

const route = Router();
route.use(express.json());

route.post('/product/create', verifyTokenAuth, controller.create);

// return all the products
route.get('/product/all', controller.getALL);

// return one product by its id
route.get('/product/one/:id', controller.getOne);

route.delete('/product/delete/:id', verifyTokenAuth, controller.deleteOne);
route.patch('/product/update/:id', verifyTokenAuth, controller.updateOne);

export default route;
