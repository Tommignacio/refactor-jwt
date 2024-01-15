'use strict'
import { Router } from 'express'
import productRouter from './product.routes.js'
import cartRouter from './cart.routes.js'
import chatRouter from './chat.routes.js'
import productViewsRouter from './productView.routes.js'
import cartViewsRouter from './cartView.routes.js'
import sessionsRouter from './sessions.router.js'
import sessionsViewsRouer from './sessionView.roues.js'
/* Manejaremos las rutas desde aca, cada vez que agreguemos una ruta, la importaremos aca */

const router = Router()

//rutas

/******  API *****/
router.use('/api/products', productRouter)
router.use('/api/carts', cartRouter)
router.use('/api/sessions', sessionsRouter)

/******  views *****/
router.use('/views', chatRouter)
router.use('/views/sessions', sessionsViewsRouer)
router.use('/views/products', productViewsRouter)
router.use('/views/carts', cartViewsRouter)

export default router //enviamos las rutas a app.js
