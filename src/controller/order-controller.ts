import { Request, Response } from 'express';
import { Order, Order_Product, OrderData } from '../models/order';

const orderData = new OrderData();

// list of orders
export const getAll = async (req: Request, res: Response) => {
  try {
    const orders: Order[] = await orderData.index();

    res.json({
      message: 'Our orders!',
      order: orders,
    });
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

// adding order
export const create = async (req: Request, res: Response) => {
  try {
    const products = req.body.products as unknown as Order_Product[];
    const o_status = req.body.o_status as unknown as boolean;
    const user_id = req.body.user_id as unknown as string;

    if (
      products === undefined ||
      o_status === undefined ||
      user_id === undefined
    ) {
      res.status(400);
      res.send(
        'you have to provide the following parameters products[], o_status, user_id'
      );
      return;
    }

    const order: Order = await orderData.create(req.body);

    res.json({
      message: 'order created!',
      order: order,
    });
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

// getting order by id
export const getOne = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;

    if (id === undefined) {
      res.status(400);
      res.send('you must privide the id ');
      return false;
    }

    const order: Order = await orderData.show(id);

    res.json({
      message: 'Here is the order!',
      order: order,
    });
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};

// updating order
export const updateOne = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const products = req.body.products as unknown as Order_Product[];
    const o_status = req.body.o_status as unknown as boolean;
    const user_id = req.body.user_id as unknown as string;

    if (
      products === undefined ||
      o_status === undefined ||
      user_id === undefined ||
      id === undefined
    ) {
      res.status(400);
      res.send(
        'you have to provide the following parameters products[], status, user_id, id'
      );
      return;
    }

    const order: Order = await orderData.update(id, req.body);

    res.json({
      message: 'order updated!',
      order: order,
    });
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};
// deleting order
export const deleteOne = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;

    if (id === undefined) {
      res.status(400);
      res.send('you must privide the id');
      return false;
    }

    await orderData.deleteOrder(id);

    res.json(`Order with id ${id} successfully deleted.`);
  } catch (e) {
    res.status(400);
    res.json(e);
  }
};
