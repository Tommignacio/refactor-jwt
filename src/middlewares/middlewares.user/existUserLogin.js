import { userApi } from '../../controllers/User.controller.js'

export const existUserLogin = async function (req, res, next) {
    try {
        const { email } = req.body
        const exists = await userApi.findUserByEmail(email)
        if (exists) {
            return next()
        } else {
            return next('error')
        }
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error en la validación del usuario' })
    }
}
