export const errorPasswLogin = async function (err, req, res, next) {
    if (err) {
        return res.status(403).json({ status: 'error', error: 'incorrect password' })
    }
    next()
}
