export const errorProduct = async function (err, req, res, next) {
    if (err) {
        console.log(typeof req.params.pid)
        return res.status(404).json({ error: ` producto con el id ${req.params.pid} no encontrado` })
    }
    next()
}
