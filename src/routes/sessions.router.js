import { Router } from 'express'
import {
    userLogged,
    userRegister,
    userLogout,
    failUserRegister,
    failUserLogin,
    githubCallBack,
} from '../controllers/User.controller.js'
import { isAdmin } from '../middlewares/middlewares.user/isAdmin.js'
import passport from 'passport'
const router = Router()

router.post('/register', isAdmin, passport.authenticate('register', { failureRedirect: 'failregister' }), userRegister)
router.get('/failregister', failUserRegister)
router.post('/login', passport.authenticate('login', { failureRedirect: 'faillogin' }), userLogged)
/** Github **/
router.get('/github', passport.authenticate('github', { scope: ['user: email'] }), async (req, res) => {})
router.get('/githubcallback', passport.authenticate('github', { failureRedirect: 'login' }), githubCallBack)
router.get('/faillogin', failUserLogin)
router.post('/logout', userLogout)
export default router
