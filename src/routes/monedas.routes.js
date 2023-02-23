import {Router} from 'express'
import {getMonedas, createMoneda, getMoneda, deleteMoneda, updateMoneda} from '../controllers/monedas.controller.js'

const router = Router()
router.get('/monedas', getMonedas)

router.post('/monedas', createMoneda)

router.get('/monedas/:id', getMoneda)

router.delete('/monedas/:id', deleteMoneda)

router.put('/monedas/:id', updateMoneda)

export default router