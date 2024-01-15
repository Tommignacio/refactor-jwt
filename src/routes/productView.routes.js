'use strict'

import { Router } from 'express'
import { getProductsPaginate } from '../controllers/ProductViewController.js'

const router = Router()

router.get('/', getProductsPaginate)

export default router
