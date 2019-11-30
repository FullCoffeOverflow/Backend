import { Router } from 'express';

import authRouter from './AuthRouter';
import usuarioRouter from './UsuarioRouter';
import imageRouter from './ImageRouter';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/usuarios', usuarioRouter);
apiRouter.use('/images', imageRouter);

export default apiRouter;
