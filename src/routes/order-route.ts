import express, { Router } from 'express';
import { verifyTokenAuth } from '../services/auth';
import * as controller from '../controller/order-controller';

const route = Router();
route.use(express.json());

route.post('/order/create', verifyTokenAuth, controller.create);

// getting all the orders
route.get('/order/all', verifyTokenAuth, controller.getAll);
route.get('/order/one/:id', verifyTokenAuth, controller.getOne);
route.delete('/order/delete/:id', verifyTokenAuth, controller.deleteOne);
route.patch('/order/update/:id', verifyTokenAuth, controller.updateOne);

export default route;
