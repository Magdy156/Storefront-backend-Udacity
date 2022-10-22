/* Replace with your SQL commands */

/*create "uuid-ossp" extension to encrypt user id for more security*/
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    user_password VARCHAR(200)
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  p_name VARCHAR(100) NOT NULL,
  price INT NOT NULL
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id uuid NOT NULL ,
  o_status  BOOLEAN NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE order_products (
  id SERIAL PRIMARY KEY,  
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE 
  ON UPDATE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
  ON UPDATE CASCADE
);