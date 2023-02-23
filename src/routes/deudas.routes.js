import {Router} from 'express'
import {getDeudas, createDeuda, getDeuda, deleteDeuda, updateDeuda} from '../controllers/deudas.controller.js'

const router = Router()
router.get('/deudas', getDeudas)

router.post('/deudas', createDeuda)

router.get('/deudas/:orden', getDeuda)

router.delete('/deudas/:orden', deleteDeuda)

router.put('/deudas/:orden', updateDeuda)

export default router