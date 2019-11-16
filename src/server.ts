import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import { mongoConnector } from './config/MongoConfig';

import healthCheckRouter from './routes/HealthCheckRouter';
import apiRouter from './routes/ApiRouter';

const server = express();

mongoConnector();

server.use(helmet());
server.use(cors());

server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use('/', healthCheckRouter);
server.use('/v01', apiRouter);

export default server;
