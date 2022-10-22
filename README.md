# Storefront Backend Project

## overview

Storefront Backend API that handle users, products and orders.

## Used Technologies

This application makes use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Environment Variables

```

POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store_front
POSTGRES_TEST_DB=store_front_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=123456
ENV=dev
BCRYPT_PASSWORD=JNADKJFASDLFSJLDAFASD
SALT_ROUNDS=10
TOKEN_SECRET=magdyksflafjasfjwopifqfwo

```

## Start app

- "npm install": install dependecies of the project.

- "npm run start": start the app on port 3200.

- "npm run test": run all tests

- "npm run build": build the app in dist/ folder.

- "npm run db-up": excute the migrations to database

- "npm run db-down": execute the migrations in reverse order in which the up migrations previously were executed

- "npm run format": for formatting using prettier

- "npm run lint": for linting using eslint
