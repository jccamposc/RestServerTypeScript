import dotenv from 'dotenv';
import Server from './models/server';

//COnfigurar dotEnv
dotenv.config();

const server = new Server();

server.listen();