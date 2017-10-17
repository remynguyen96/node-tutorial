import express from 'express';
import './config/database';
import constants from './config/constants';
import { createServer } from 'http';
import mocks from './mocks';
import middleware from './config/middleware';

const app = express();
middleware(app);
const graphQLServer = createServer(app);

graphQLServer.listen(constants.PORT, err => {
  if(err) {
    console.error(err);
  } else {
    console.log(`Running App With Port: ${constants.PORT}`);
  }
});