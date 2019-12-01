import { Router } from 'express';

import authRouter from './AuthRouter';
import usuarioRouter from './UsuarioRouter';
import imageRouter from './ImageRouter';
import barbeiroRouter from './BarbeiroRouter';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/usuarios', usuarioRouter);
apiRouter.use('/images', imageRouter);
apiRouter.use('/barbeiros', barbeiroRouter);

export default apiRouter;
