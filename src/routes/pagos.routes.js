import {Router} from 'express'
import {getPagos, createPago, getPago, deletePago, updatePago} from '../controllers/pagos.controller.js'

const router = Router()
router.get('/pagos', getPagos)

router.post('/pagos', createPago)

router.get('/pagos/:id', getPago)

router.delete('/pagos/:id', deletePago)

router.put('/pagos/:id', updatePago)

export default router