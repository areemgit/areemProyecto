import {Router} from 'express'
import {getUsuarios, createUsuario, getUsuario, deleteUsuario, updateUsuario} from '../controllers/usuarios.controller.js'

const router = Router()
router.get('/usuarios', getUsuarios)

router.post('/usuarios', createUsuario)

router.get('/usuarios/:id', getUsuario)

router.delete('/usuarios/:id', deleteUsuario)

router.put('/usuarios/:id', updateUsuario)

export default router