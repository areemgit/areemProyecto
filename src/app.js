import express from "express"
import usuariosRoutes from './routes/usuarios.routes.js'
import rolesRoutes from './routes/roles.routes.js'
import monedasRoutes from './routes/monedas.routes.js'
import uNegocioRoutes from './routes/uNegocio.routes.js'
import fpagoRoutes from './routes/fPagos.routes.js'
import clientesRoutes from './routes/clientes.routes.js'
import pagosRoutes from './routes/pagos.routes.js'
import deudasRoutes from './routes/deudas.routes.js'
import loginRoutes from './routes/login.routes.js'
import cors from 'cors';
import cookieParser from "cookie-parser"
import documentosRoutes from './routes/documentos.routes.js'

const app = express();

app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}); 
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static('./src/archivos'));
app.use(cors())

app.use('/api', usuariosRoutes)
app.use('/api', rolesRoutes)
app.use('/api', monedasRoutes)
app.use('/api', uNegocioRoutes)
app.use('/api', fpagoRoutes)
app.use('/api', clientesRoutes)
app.use('/api', pagosRoutes)
app.use('/api', deudasRoutes)
app.use('/api', loginRoutes)
app.use('/api', documentosRoutes)


export default app;