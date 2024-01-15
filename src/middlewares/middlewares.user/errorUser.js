export const errorUser = async function (err, req, res, next) {
    if (err) {
        return res.status(404).json({ error: ` usuario con el id ${req.body._id} ya existe` })
    }
    next()
}
