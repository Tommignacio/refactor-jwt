export const errorCart = async function (err, req, res, next) {
    if (err) {
        return res.status(404).json({ error: ` carrito con el id ${req.params.cid} no encontrado` })
    }
    next()
}
