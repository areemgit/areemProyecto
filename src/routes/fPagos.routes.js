import {Router} from 'express'
import {getFPagos, createFPago, getFPago, deleteFPago, updateFPago} from '../controllers/fpagos.controller.js'

const router = Router()
router.get('/fPago', getFPagos)

router.post('/fPago', createFPago)

router.get('/fPago/:id', getFPago)

router.delete('/fPago/:id', deleteFPago)

router.put('/fPago/:id', updateFPago)

export default router