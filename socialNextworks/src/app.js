import express from 'express';
import './config/database';
import constants from './config/constants';
import middleware from './config/middleware';
import apiRoutes from './modules';

const app = express();
// NOTE: Setup Middleware
middleware(app);
// NOTE: Setup Router
apiRoutes(app);
// NOTE: Setup Server
app.listen(constants.PORT, err => {
  if(err) {
    throw err;
  } else {
    console.log(` Server Running On Port : ${constants.PORT} With ${process.env.NODE_ENV}`);
  }
});