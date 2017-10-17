import { Router } from 'express';
import authRoutes from './auth';
import promiseRoutes from './promise';
import AuthService from './auth/auth-services';

const routes = new Router();
routes.use('/auth', authRoutes);
routes.use('/promise', promiseRoutes);


routes.get('/test/:id', AuthService.jwtMiddleware, (req, res) => {
  let checkReg = /^\d+$/g;
  let paramId = req.params['id'];
  if(checkReg.test(paramId)) {
    res.status(200).json({
      user: req.user,
      header: req.headers.authorization,
    });
  } else {
    res.status(403).send('Params ID wis not valid');
  }
});

export default routes;

