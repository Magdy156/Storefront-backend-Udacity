import client from '../database';

export type Order_Product = {
  product_id: number;
  quantity: number;
};
// i had to make the two following interfaces to be able to test using jasmine but in case of not using jasmine there is no need to have two interfaces

export interface MainOrder {
  products: Order_Product[];
  user_id: string;
  // order status can be active or complete according to whatever you want
  o_status: boolean;
}

export interface Order extends MainOrder {
  id: number;
}
export class OrderData {
  // list of orders
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();

      const sql =
        'SELECT orders.id, orders.user_id, orders.o_status, order_products.product_id, order_products.quantity FROM orders JOIN order_products ON order_products.order_id= orders.id';
      const result = await conn.query(sql);

      const orders = [];

      // this logic made to display order data professionally
      for (const order of result.rows) {
        // distructuring
        const { product_id, quantity, id, user_id, o_status } = order;
        const products = [];
        // this collect product data together in one array
        products.push({
          product_id: product_id,
          quantity: quantity,
        });
        // then display all order data
        orders.push({
          id: id,
          user_id: user_id,
          o_status: o_status,
          products: products,
        });
      }

      conn.release();

      return orders;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }
  // getting one order
  async show(id: number): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';

      // @ts-ignore
      const connection = await client.connect();
      const result = await connection.query(sql, [id]);
      const order = result.rows[0];

      const orderProductsInfo =
        'SELECT product_id, quantity FROM order_products WHERE order_id=($1)';

      const { rows: order_product_info } = await connection.query(
        orderProductsInfo,
        [id]
      );

      connection.release();

      // this logic made to display order data professionally
      return {
        ...order,
        products: order_product_info,
      };
    } catch (err) {
      throw new Error(`Could not find order ${id}. ${err}`);
    }
  }
  // adding new order
  async create(o: MainOrder): Promise<Order> {
    // products is array
    const { products, o_status, user_id } = o;

    try {
      const sql =
        'INSERT INTO orders (user_id, o_status) VALUES($1, $2) RETURNING *';
      // @ts-ignore
      const connection = await client.connect();
      const result = await connection.query(sql, [user_id, o_status]);
      const order = result.rows[0];

      const order_products_sql =
        'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity';
      const orderProducts = [];

      // this loop handles the products array
      for (const product of products) {
        const { product_id, quantity } = product;

        const { rows } = await connection.query(order_products_sql, [
          order.id,
          product_id,
          quantity,
        ]);

        orderProducts.push(rows[0]);
      }

      connection.release();

      return {
        ...order,
        products: orderProducts,
      };
    } catch (err) {
      throw new Error(`Could not add new order for user ${user_id}. ${err}`);
    }
  }
  // removing order
  async deleteOrder(id: number): Promise<Order> {
    try {
      // @ts-ignore
      const connection = await client.connect();
      const orderProductsSql = 'DELETE FROM order_products WHERE order_id=($1)';
      await connection.query(orderProductsSql, [id]);

      const sql = 'DELETE FROM orders WHERE id=($1)';
      const result = await connection.query(sql, [id]);

      const order = result.rows[0];

      connection.release();

      return order;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. ${err}`);
    }
  }

  // updateing order
  async update(id: number, newOrder: MainOrder): Promise<Order> {
    const { products, o_status, user_id } = newOrder;

    try {
      const sql = 'UPDATE orders SET o_status = $1 WHERE id = $2 RETURNING *';
      // @ts-ignore
      const connection = await client.connect();
      const result = await connection.query(sql, [o_status, id]);
      const order = result.rows[0];

      const order_products_sql =
        'UPDATE order_products SET product_id = $1, quantity = $2 WHERE order_id = $3 RETURNING product_id, quantity';
      const orderProducts = [];

      for (const product of products) {
        const { product_id, quantity } = product;

        const { rows } = await connection.query(order_products_sql, [
          product_id,
          quantity,
          order.id,
        ]);
        orderProducts.push(rows[0]);
      }

      connection.release();

      return {
        ...order,
        products: orderProducts,
      };
    } catch (err) {
      throw new Error(`Could not update order for user ${user_id}. ${err}`);
    }
  }
}
