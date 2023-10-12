import express from 'express'
const app = express()
import morgan from 'morgan'
import router from './routes/index.routes.js'
import { PORT } from './utils/env.config.js'

//middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//ruta
app.use('/api', router)

const connectedServer = app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})

connectedServer.on('error', error => {
    console.error('Error: ', error)
})
