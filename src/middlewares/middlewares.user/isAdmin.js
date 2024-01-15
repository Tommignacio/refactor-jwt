export const isAdmin = async function (req, res, next) {
    try {
        const { email, password } = req.body
        const isAdminUser = email === 'adminCoder@coder.com' && password === 'adminCod3r123'
        req.isAdmin = isAdminUser //variable req temporal
        return next()
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error en la validación del usuario' })
    }
}
