import {Router} from 'express'
import {getUsuarios, createUsuario, getUsuario, deleteUsuario, updateUsuario, deletePass, createPass} from '../controllers/usuarios.controller.js'

const router = Router()
router.get('/usuarios', getUsuarios)

router.post('/usuarios', createUsuario)

router.get('/usuarios/:id', getUsuario)

router.delete('/usuarios/:id', deleteUsuario)

router.put('/usuarios/:id', updateUsuario)

router.get('/Dpass/:id', deletePass)

router.patch('/Cpass/:id', createPass)

export default router