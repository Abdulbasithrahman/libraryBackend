import express from 'express'
import UserRegister from '../controller/user/Register.js'
import { UserLogin } from '../controller/user/Login.js'

const router = express.Router()

router.post('/register',UserRegister)
router.post('/login',UserLogin)

export default router