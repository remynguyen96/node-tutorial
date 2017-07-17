import userRoutes from './users/user.routes';
import postRoutes from './posts/posts.routes';
// import { authJwt } from '../services/auth.services';


export default app => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
  app.use('/api/users', userRoutes);
  app.use('/api/posts', postRoutes);
  // app.get('/hello', authJwt, (req, res) => res.send({ status: 'successful !' }));
};
