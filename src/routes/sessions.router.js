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

router.post(
    '/register',
    isAdmin,
    passport.authenticate('register', { failureRedirect: 'failregister', session: false }),
    userRegister
)
router.get('/failregister', failUserRegister)
router.post('/login', passport.authenticate('login', { failureRedirect: 'faillogin', session: false }), userLogged)
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send(req.user)
})
/** Github **/
router.get('/github', passport.authenticate('github', { scope: ['user: email'], session: false }), async (req, res) => {
    console.log('first')
})
router.get(
    '/githubcallback',
    passport.authenticate('github', { failureRedirect: 'login', session: false }),
    githubCallBack
)
router.get('/faillogin', failUserLogin)
router.post('/logout', userLogout)
export default router
