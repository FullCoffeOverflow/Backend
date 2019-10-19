import { Router } from "express";
import { checkJwt } from "../middlewares/CheckJwt";

import UsuarioController from "../controllers/UsuarioController";

const router = Router();

router.post("/cadastro", UsuarioController.cadastrar);
router.put("/:usuarioId", [checkJwt], UsuarioController.atualizarPorId);

export default router;
