import {Router} from 'express'
import {login, logout} from '../controllers/login.controller.js'

const router = Router()

router.post('/login', login)
router.get('logout', logout)

export default router