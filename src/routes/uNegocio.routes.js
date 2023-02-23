import {Router} from 'express'
import { getUNegocios, createUNegocio, getUNegocio, deleteUNegocio, updateUNegocio} from '../controllers/uNegocio.controller.js'

const router = Router()
router.get('/uNegocio', getUNegocios)

router.post('/uNegocio', createUNegocio)

router.get('/uNegocio/:id', getUNegocio)

router.delete('/uNegocio/:id', deleteUNegocio)

router.put('/uNegocio/:id', updateUNegocio)

export default router