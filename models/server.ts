
import express, { Application } from 'express';
import cors from 'cors';

import userRoutes from '../routes/usuario';
import db from '../db/connection';

class Server {

    private app: Application;
    private port: string;
    
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor() {

        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConnection();

        //funciones
        this.middlewares();

        //Metodos iniciales
        this.routes();
    }

    middlewares() {

        //CORS
        this.app.use( cors() ) ;

        //Lectura del BODY
        this.app.use( express.json() );

        //Carpeta Publica
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use(this.apiPaths.usuarios, userRoutes);
    }
    

    listen() {
        this.app.listen(this.port, () => {
            console.log( 'Servidor corriendo en puerto ', this.port );
        });
    }

    async dbConnection() {
        try {
            
            await db.authenticate();
            console.log('Database online');

        } catch (error) {
            throw new Error( error );
        }
    }

}

export default Server;