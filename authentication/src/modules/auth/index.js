import { Router } from 'express';
import * as AuthController from './auth-controller';
import AuthService from './auth-services';
import request from 'request';
import Promise from 'bluebird';

const routes = new Router();

routes.post('/register', AuthController.signup);
routes.post('/login', AuthService.loginMiddleware, AuthController.login);

export default routes;