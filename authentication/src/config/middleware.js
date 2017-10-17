import morgan from 'morgan';
import bodyParser from 'body-parser';
// import compression from 'compression';
// import helmet from 'helmet';

export default app => {
  app.use(morgan('dev'));
  // app.use(compression());
  // app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};
