import { Request, Response } from 'express';

import { ProductStore } from '../models/product';

const productStore = new ProductStore();

export const create = async (req: Request, res: Response) => {
  try {
    if (req.body.p_name === undefined || req.body.price === undefined) {
      res
        .status(400)
        .send('you have to provide the name and the price of the product');
      return;
    }
    const product = await productStore.create(req.body);
    res.json({
      message: 'product added',
      data: { ...product },
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
export const getALL = async (req: Request, res: Response) => {
  try {
    const products = await productStore.index();
    if (products == undefined) {
      return res.json('We do not have products now!');
    }

    res.json({
      message: 'the products that we have',
      data: { products },
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
export const getOne = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const product = await productStore.show(id);
    if (product == undefined) {
      res.json('this product is not available');
      return;
    }
    res.json({
      message: 'Here is your product',
      data: { product },
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
export const deleteOne = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const product = await productStore.delete(id);

    res.json({
      message: 'product deleted',
      data: { product },
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
export const updateOne = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;

    if (req.body.price === undefined || req.body.p_name === undefined) {
      return res.json(
        'you have to provide the name and the price and id of the product that you need to update'
      );
    }
    const product = await productStore.update(id, req.body);
    if (product == undefined) {
      return res.json('wrong id');
    }
    res.json({
      message: 'product updated',
      data: { product },
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
