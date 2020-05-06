import { Router } from 'express';
import multer from 'multer';
import { resolve } from 'path';
import uploadConfig from './config/uploadConfig';

import PostController from './controllers/PostController';

const postController = new PostController();
const routes = Router();
const upload = multer(uploadConfig);
const filesFormat = upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'publication', maxCount: 1 },
]);

routes.post('/posts', filesFormat, postController.post);

routes.get('/posts/files', postController.show);

routes.get('/post/:id', postController.index);

routes.delete('/posts/:id', postController.delete);

routes.put('/posts/:id', filesFormat, postController.update);

export default routes;
