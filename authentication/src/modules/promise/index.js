import { Router } from 'express';
import * as PromiseController from './promise-controller';
const routes = new Router();

routes.get('/promise-part1', PromiseController.promisePart1);

export default routes;


