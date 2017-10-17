import constants from './constants';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';
////////
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import {makeExecutableSchema } from 'graphql-tools';
import typeDefs from '../graphQL/schema';
import resolvers from '../graphQL/resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default app => {
  app.use(morgan('dev'));
  app.use(helmet());
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/graphiql', graphiqlExpress({
    endPointURL: constants.GRAPHQL_PATH
  }));
  app.use(constants.GRAPHQL_PATH, graphqlExpress(req => ({
    schema,
    // context: {
    //   user: req.user
    // }
  })),);
}