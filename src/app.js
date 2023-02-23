import express from "express"
import usuariosRoutes from './routes/usuarios.routes.js'
import rolesRoutes from './routes/roles.routes.js'
import monedasRoutes from './routes/monedas.routes.js'
import uNegocioRoutes from './routes/uNegocio.routes.js'
import fpagoRoutes from './routes/fPagos.routes.js'
import clientesRoutes from './routes/clientes.routes.js'
import pagosRoutes from './routes/pagos.routes.js'
import deudasRoutes from './routes/deudas.routes.js'

const app = express()

app.use(express.json())

app.use('/api', usuariosRoutes)
app.use('/api', rolesRoutes)
app.use('/api', monedasRoutes)
app.use('/api', uNegocioRoutes)
app.use('/api', fpagoRoutes)
app.use('/api', clientesRoutes)
app.use('/api', pagosRoutes)
app.use('/api', deudasRoutes)

app.use((req, res, next) =>{
    res.status(404).json({
        message: 'endpoint not found'
    })
})

export default app;