import { Router } from 'express';

import authRouter from './AuthRouter';
import usuarioRouter from './UsuarioRouter';
import imageRouter from './ImageRouter';
import barbeiroRouter from './BarbeiroRouter';
import corteRouter from './CorteRouter';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/usuarios', usuarioRouter);
apiRouter.use('/images', imageRouter);
apiRouter.use('/barbeiros', barbeiroRouter);
apiRouter.use('/cortes', corteRouter);

export default apiRouter;
