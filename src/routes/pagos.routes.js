import {Router} from 'express'
import {getPagos, createPago, getPago, updatePago, evidencePago} from '../controllers/pagos.controller.js'

const router = Router()
router.get('/pagos', getPagos)

router.post('/pagos', createPago)

router.get('/pagos/:id', getPago)

// router.delete('/pagos/:id', deletePago)

router.put('/pagos/:id', updatePago)

router.patch('/evidencia/:id', evidencePago)

export default router