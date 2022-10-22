import client from '../database';
import bcrypt from 'bcrypt';

// destructuring to get secret words to encrypt user's password
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
const pepper = BCRYPT_PASSWORD as string;
const saltRounds = SALT_ROUNDS as string;

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  user_password: string;
};
export class UserData {
  // list of users
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }
  // get one user
  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  // adding user
  async create(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql =
        'INSERT INTO users (first_name, last_name, user_password) VALUES($1, $2, $3) RETURNING *';

      // encrypting the user's password
      const hash = bcrypt.hashSync(
        u.user_password + pepper,
        parseInt(saltRounds)
      );

      const result = await conn.query(sql, [u.first_name, u.last_name, hash]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`unable create user (${u.first_name}): ${err}`);
    }
  }
  // removing user
  async delete(id: string): Promise<User> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
  // updating user
  async update(id: string, u: User): Promise<User> {
    try {
      const sql =
        'UPDATE users SET first_name = $1, last_name = $2, user_password= $3 WHERE id = $4 RETURNING *';
      // @ts-ignore
      const conn = await client.connect();
      // encrypting the user's password
      const hash = bcrypt.hashSync(
        u.user_password + pepper,
        parseInt(saltRounds)
      );

      const result = await conn.query(sql, [
        u.first_name,
        u.last_name,
        hash,
        id,
      ]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not update user ${id}. Error: ${err}`);
    }
  }

  // check if user is in th database
  async authenticate(
    first_name: string,
    password: string
  ): Promise<User | null> {
    // @ts-ignore
    const conn = await client.connect();
    const sql = 'SELECT * FROM users WHERE first_name=($1)';

    const result = await conn.query(sql, [first_name]);

    // this condition checks if the password corrct or not
    if (result.rows.length) {
      const user = result.rows[0];

      if (bcrypt.compareSync(password + pepper, user.user_password)) {
        return user;
      }
    }

    return null;
  }
}
