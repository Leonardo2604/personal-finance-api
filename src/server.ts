import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';

import App from './app';

const server = express();

App.init(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`App is running in: http://localhost:${PORT}`);
});
