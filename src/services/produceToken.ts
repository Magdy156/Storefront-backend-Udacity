// this function just produces token

import jwt from 'jsonwebtoken';
import { User } from '../models/user';
//getting my secret key from .env file
const { TOKEN_SECRET } = process.env;
const secret = TOKEN_SECRET as jwt.Secret;

export const produceToken = (user: User): string => {
  // without user's password for security
  return jwt.sign(
    { fname: user.first_name, lname: user.last_name, id: user.id },
    secret
  );
};
