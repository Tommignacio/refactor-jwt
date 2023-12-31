'use strict'

import { Router } from 'express'
import { getCartPaginate } from '../controllers/CartViewController.js'

const router = Router()

router.get('/:cid', getCartPaginate)

export default router