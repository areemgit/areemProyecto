import {Router} from 'express'
import {getRoles, createRol, getRol, deleteRol, updateRol  } from '../controllers/roles.controller.js'

const router = Router()
router.get('/roles', getRoles)

router.post('/roles', createRol)

router.get('/roles/:id', getRol)

router.delete('/roles/:id', deleteRol)

router.put('/roles/:id', updateRol)

export default router