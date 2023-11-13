import { Router } from 'express'
import { getChat } from '../controllers/ChatController.js'

const router = Router()

router.get('/', getChat)

export default router
