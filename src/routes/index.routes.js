import { Router } from 'express'
import productRouter from './product.routes.js'
import cartRouter from './cart.routes.js'
import chatRouter from './chat.routes.js'
/* Manejaremos las rutas desde aca, cada vez que agreguemos una ruta, la importaremos aca */

const router = Router()

//rutas

/******  API *****/
router.use('/api/products', productRouter)
router.use('/api/carts', cartRouter)

/******  views *****/
router.use('/', chatRouter)

export default router //enviamos las rutas a app.js
