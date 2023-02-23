import {Router} from 'express'
import {getClientes, createClientes, getCliente, deleteClientes, updateClientes } from '../controllers/clientes.controller.js'

const router = Router()
router.get('/clientes', getClientes)

router.post('/clientes', createClientes)

router.get('/clientes/:id', getCliente)

router.delete('/clientes/:id', deleteClientes)

router.put('/clientes/:id', updateClientes)

export default router