import { Router } from 'express';
import { checkJwt } from '../middlewares/CheckJwt';

import BarbeiroController from '../controllers/BarbeiroController';

const router = Router();

router.get('/', BarbeiroController.retornar);
router.post('/cadastro', BarbeiroController.cadastrar);
router.get('/:barbeiroId', BarbeiroController.retornarPorId);
router.delete('/:barbeiroId', BarbeiroController.deletarPorId);
router.put('/:usuarioId', [checkJwt], BarbeiroController.atualizarPorId);

export default router;
