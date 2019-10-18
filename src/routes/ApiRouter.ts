import { Router } from "express";
import authRouter from "./AuthRouter";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);

export default apiRouter;
