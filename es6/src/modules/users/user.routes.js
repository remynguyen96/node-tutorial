import { Router } from 'express';
import validate from 'express-validation';

import { authLocal } from '../../services/auth.services';
import * as UserController from './user.controllers';
import userValidation from './user.validation';

const routes = new Router();

routes.post('/sign-up', validate(userValidation.signUp), UserController.signUp);
routes.post('/login', authLocal, UserController.login);
// routes.get('/demo', (req, res) =>  res.json('lorem'));

export default routes;
