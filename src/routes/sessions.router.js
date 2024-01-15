import { Router } from 'express'
import { userLogged, userRegister, userLogout } from '../controllers/User.controller.js'
import { existUser } from '../middlewares/middlewares.user/existUser.js'
import { errorUser } from '../middlewares/middlewares.user/errorUser.js'
import { existUserLogin } from '../middlewares/middlewares.user/existUserLogin.js'
import { errorUserLogin } from '../middlewares/middlewares.user/errorUserLogin.js'
import { isAdmin } from '../middlewares/middlewares.user/isAdmin.js'
const router = Router()

router.post('/register', existUser, errorUser, isAdmin, userRegister)
router.post('/login', existUserLogin, errorUserLogin, userLogged)
router.post('/logout', userLogout)
export default router
