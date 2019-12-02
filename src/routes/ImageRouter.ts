import { Router } from 'express';

import { checkJwt } from '../middlewares/CheckJwt';
import { imageParser } from '../middlewares/ImageParser';

import ImageController from '../controllers/ImageController';

const router = Router();

router.post('/saveImage/:corteId', [checkJwt, imageParser], ImageController.saveImage);

router.get('/getImageByUsuario', [checkJwt], ImageController.getByUsuario);

router.get('/getImageByBarbeiro', [checkJwt], ImageController.getByBarbeiro);

export default router;
