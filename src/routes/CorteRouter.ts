import { Router } from 'express';
import { checkJwt } from '../middlewares/CheckJwt';

import CorteController from '../controllers/CorteController';

const router = Router();

router.get('/status/:status', CorteController.retornarPorStatus);
router.get('/:corteId', CorteController.retornarPorId);
router.get('/barbeiro/:barbeiroId/status/:status', CorteController.retornarPorBarbeiroEStatus);
router.get('/usuario/:usuarioId/status/:status', CorteController.retornarPorUsuarioEStatus);
router.post('/newcorte', CorteController.adicionar);
router.put('/:corteId', CorteController.atualizarPorId);
router.put('/foto/:corteId', CorteController.adicionaFoto)

export default router;
