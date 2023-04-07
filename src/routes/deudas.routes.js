import {Router} from 'express'
import {getDeudas, createDeuda, getDeuda, updateDeuda, sumarPago, restarDeuda, retrasoDias, retrasoSemanas} from '../controllers/deudas.controller.js'

const router = Router()
router.get('/deudas', getDeudas)

router.post('/deudas', createDeuda)

router.get('/deudas/:orden', getDeuda)

// router.delete('/deudas/:orden', deleteDeuda)

router.put('/deudas/:orden', updateDeuda)

router.patch('/pago/:orden', sumarPago)

router.get('/deuda/:orden',restarDeuda )

router.get('/Rdias', retrasoDias)

router.get('/Rsemanas', retrasoSemanas)

export default router