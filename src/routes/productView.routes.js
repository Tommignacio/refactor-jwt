'use strict'

import { Router } from 'express'
import { getProductsPaginate } from '../controllers/ProductViewController.js'
import passport from 'passport'

const router = Router()

router.get('/', passport.authenticate('jwt', { session: false }), getProductsPaginate)

export default router
