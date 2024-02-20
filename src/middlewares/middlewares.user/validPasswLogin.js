import { userApi } from '../../controllers/User.controller.js'
import { isValidPassword } from '../../utils/utils.js'

export const validPasswLogin = async function (req, res, next) {
    try {
        const { email, password } = req.body
        const user = await userApi.findUserByEmail(email)
        if (isValidPassword(user, password)) {
            return next()
        } else {
            return next('error')
        }
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error en la validación del usuario' })
    }
}
