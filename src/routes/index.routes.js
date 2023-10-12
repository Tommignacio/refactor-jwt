import { Router } from 'express'
import productRouter from './product.routes.js'
import cartRouter from './cart.routes.js'

/* Manejaremos las rutas desde aca, cada vez que agreguemos unna ruta, la importaremos aca */

const router = Router()

//rutas
router.use('/products', productRouter)
router.use('/carts', cartRouter)

export default router //enviamos las rutas a app.js
