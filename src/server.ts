import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

import { mongoConnector } from './config/mongoConfig';
import healthCheckRouter from './routes/healthCheckRouter';

const server = express();

mongoConnector();

server.use(morgan('dev'));
server.use(bodyParser());
server.use(bodyParser.urlencoded({ extended: true }));

server.use("/", healthCheckRouter);

export default server;