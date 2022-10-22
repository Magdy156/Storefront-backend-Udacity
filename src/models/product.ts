import client from '../database';

// i had to make the two following interfaces to be able to test using jasmine but in case of not using jasmine there is no need to have two interfaces
export interface MainProduct {
  p_name: string;
  price: number;
}

export interface Product extends MainProduct {
  id: number;
}

export class ProductStore {
  // list of products
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }
  // getting one product
  async show(id: number): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }
  // adding product
  async create(p: MainProduct): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (p_name, price) VALUES($1, $2) RETURNING *';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [p.p_name, p.price]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not add new product Error: ${err}`);
    }
  }
  // removing product
  async delete(id: number): Promise<Product> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1)';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
  // updating product data
  async update(id: number, p: MainProduct): Promise<Product> {
    try {
      const sql =
        'UPDATE products SET P_name = $1, price = $2 WHERE id = $3 RETURNING *';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [p.p_name, p.price, id]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not update product ${id}. Error: ${err}`);
    }
  }
}
