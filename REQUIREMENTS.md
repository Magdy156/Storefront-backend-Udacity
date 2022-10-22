# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Users

- Index: /user [GET] [token required]
- Create: /user/create [POST] [token required]
- show: /user/one/:id [GET] [token required]
- Update: /user/update/:id [PATCH] [token required]
- Delete: /user/delete/:id [DELETE] [token required]
- Authenticate: /user/:fname/:password [GET] "will return your token and your data"

#### Products

- Index: /product/all [GET]
- Create: /product/create [POST] [token required]
- show: /product/one/:id [GET]
- Update: /product/update/:id [PATCH] [token required]
- Delete: /product/delete/:id [DELETE] [token required]

#### Orders

- Index: /order/all [GET] [token required]
- Create: /order/create [POST] [token required]
- show: /order/one/:id [GET] [token required]
- Update: /order/update/:id [PATCH] [token required]
- Delete: /order/delete/:id [DELETE] [token required]

#### Products

- Index
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders

- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

```
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

```
