import express, { Router } from 'express';
import { verifyTokenAuth } from '../services/auth';
import * as controller from '../controller/user-controller';

const route = Router();
route.use(express.json());

route.post('/user/create', controller.create);

// return all the users
route.get('/user/all', verifyTokenAuth, controller.getAll);

// return one user by his id
route.get('/user/one/:id', verifyTokenAuth, controller.getOne);

// ensure that the user exists in database and return his token
route.get('/user/:fname/:password', controller.authenticate);

route.delete('/user/delete/:id', verifyTokenAuth, controller.deleteOne);
route.patch('/user/update/:id', verifyTokenAuth, controller.updateOne);

export default route;
