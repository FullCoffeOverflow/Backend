import { Router } from 'express';

import { checkJwt } from '../middlewares/CheckJwt';
import { imageParser } from '../middlewares/ImageParser';

import ImageController from '../controllers/ImageController';

const router = Router();

router.post('/saveImage/:corteId', [checkJwt, imageParser], ImageController.saveImage);

router.get('/getImage', [checkJwt], ImageController.getByUsuario);

export default router;
