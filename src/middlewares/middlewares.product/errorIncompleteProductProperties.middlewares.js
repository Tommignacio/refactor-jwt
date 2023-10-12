export const errorIncompleteProductProperties = async function (err, req, res, next) {
    if (err) {
        return res.status(404).json({ error: 'Incomplete values' })
    }
    next()
}
