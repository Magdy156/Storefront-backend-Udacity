// importing Express to run server and routes
import express from 'express';

// Start up an instance of app
const app: express.Application = express();

import route from './routes/product-route';
import user_route from './routes/user-route';
import order_route from './routes/order-route';

// parse json data
app.use(express.json());

// Cors for cross origin allowance
import cors from 'cors';
app.use(cors());

const port = 3200;

// the main api endpoints
app.use('/', route);
app.use('/', user_route);
app.use('/', order_route);

// this end point is to bind and listen the connections on the specified host and port.
app.listen(port, (): void => {
  console.log(`server works on port ${port}`);
});

export default app;
