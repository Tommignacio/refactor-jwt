export const errorUserLogin = async function (error, req, res, next) {
    try {
        const { email } = req.body
        if (error) {
            return res.status(404).json({ error: ` usuario con el email ${email} no existe` })
        }
        next()
    } catch (error) {
        return res.status(500).json({ error: ` error al validar usuario con el email ${email} ` })
    }
}
