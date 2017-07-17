import {Router} from 'express';
import validate from 'express-validation';

import * as PostController from './posts.controllers';
import {authJwt} from '../../services/auth.services';
import postValidation from './posts.validation';

const routes = new Router();

routes.get('/', authJwt, PostController.getPostsList);

routes.post('/', authJwt, validate(postValidation.createPost), PostController.createPost);

routes.get('/:id', authJwt, PostController.getPostById);

routes.patch('/:id', authJwt, validate(postValidation.updatePost), PostController.updatePost);

routes.delete('/:id', authJwt, PostController.deletePost);

routes.post('/:id/favorite', authJwt, PostController.favoritePost);

routes.post('/upload', PostController.uploadImage);

export default routes;
