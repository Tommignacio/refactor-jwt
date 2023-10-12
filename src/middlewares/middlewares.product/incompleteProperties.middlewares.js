export const incompleteProperties = async function (req, res, next) {
    let product = req.body
    if (
        !product.title ||
        !product.description ||
        !product.code ||
        !product.price ||
        !product.stock ||
        !product.category
    ) {
        return next('error')
    }

    next()
}
