import { Request, Response } from 'express';

import { UserData, User } from '../models/user';

import jwt from 'jsonwebtoken';

const userData = new UserData();

//getting my secret key from .env file
const { TOKEN_SECRET } = process.env;
const secret = TOKEN_SECRET as jwt.Secret;

// adding user
export const create = async (req: Request, res: Response) => {
  try {
    if (
      req.body.first_name === undefined ||
      req.body.last_name === undefined ||
      req.body.user_password === undefined
    ) {
      return res.json(
        'you have to provide the "first_name" and the "last_name" and the "user_password" of the user that you need to create'
      );
    }

    const user = await userData.create(req.body);

    // with out user's password for security
    const token = jwt.sign(
      { fname: user.first_name, lname: user.last_name, id: user.id },
      secret
    );
    res.json({
      message: 'user creation done!',
      data: { token, user },
    });
  } catch (err) {
    res.status(400).json(err);
  }
};
// list of users
export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await userData.index();
    if (users == undefined) {
      return res.json('We do not have users now!');
    }

    res.json({
      message: 'Our users',
      data: { users },
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
// getting one user
export const getOne = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as string;
    const user = await userData.show(id);
    if (user == undefined) {
      res.json('this user is not available');
      return;
    }
    res.json({
      message: 'Here is our user',
      data: { user },
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
// removing user
export const deleteOne = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as string;
    const product = await userData.delete(id);

    res.json({
      message: 'user deleted',
      data: { product },
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// updating user
export const updateOne = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as string;

    if (
      req.body.first_name === undefined ||
      req.body.last_name === undefined ||
      req.body.user_password === undefined
    ) {
      return res.json(
        'you have to provide the first name and the last name and the password of the user that you need to update'
      );
    }
    const user = await userData.update(id, req.body);
    if (user == undefined) {
      return res.json('wrong id');
    }
    res.json({
      message: 'user updated',
      data: { user },
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// check if user is in th database
export const authenticate = async (req: Request, res: Response) => {
  try {
    const user: User | null = await userData.authenticate(
      req.params.fname,
      req.params.password
    );
    if (user === null) {
      res.status(401);
      res.send('Wrong password');

      return false;
    }
    const token = jwt.sign(
      { fname: user.first_name, lname: user.last_name, id: user.id },
      secret
    );
    res.json({
      message: 'athentication done!, here is your token',
      data: { token, user: user },
    });
  } catch (err) {
    res.status(400).json(err);
  }
};
