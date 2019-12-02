import { Router } from 'express';
import { checkJwt } from '../middlewares/CheckJwt';

import UsuarioController from '../controllers/UsuarioController';

const router = Router();

router.get('/:usuarioId', UsuarioController.retornarPorId );
router.post('/cadastro', UsuarioController.cadastrar);
router.put('/:usuarioId', [checkJwt], UsuarioController.atualizarPorId);

export default router;
