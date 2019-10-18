import { Router } from "express";

import authRouter from "./AuthRouter";
import usuarioRouter from "./UsuarioRouter";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/usuarios", usuarioRouter);

export default apiRouter;
