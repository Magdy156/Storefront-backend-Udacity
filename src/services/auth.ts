// here i made the function that check tokens for users for authorization

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function verifyTokenAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // this condition ensure if the client have token or not
  if (!req.headers.authorization) {
    res.status(401);
    res.json('Access denied, invalid token');

    return;
  }

  try {
    // because 'Bearer' is seperated by ' '  beside token request.header.authorization
    const token = req.headers.authorization.split(' ')[1];

    // take token and my secret word in .env file
    jwt.verify(token, process.env.TOKEN_SECRET as jwt.Secret);

    // if verifying succeed, will pass to the next middleware
    next();
  } catch (err) {
    console.error(err);

    res.status(401);
    res.json('Access denied, invalid token');
  }
}
