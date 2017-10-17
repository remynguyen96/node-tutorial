/* eslint-disable no-console */
import express from 'express';
import './config/database';
import constants from './config/constants';
////////
import { createServer } from 'http';
import mocks from './mocks';
import middleware from './config/middleware';

const app = express();
middleware(app);
const graphQLServer = createServer(app);

// mocks().then(() => {
  graphQLServer.listen(constants.PORT, err => {
    if (err) {
      console.error(err);
    } else {
      console.log(`App listen to port: ${constants.PORT}`);
    }
  });
// });

// app.listen(constants.PORT, err => {
//    if(err) {
//        throw err;
//    } else {
//        console.log(`Server Running On Port : ${constants.PORT}`)
//    }
// });
