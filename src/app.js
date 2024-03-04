import express from 'express'
import morgan from 'morgan'
// import session from 'express-session'
// import MongoStorage from 'connect-mongo'
import router from './routes/index.routes.js'
import { envConfig } from './config/env.config.js'
import { connectDb } from './DB/dbConnection.js'
import { engine } from 'express-handlebars'
import { Server as ioServer } from 'socket.io'
import http from 'http'
import sockets from './sockets.js'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import cookieParser from 'cookie-parser'

const app = express()
const httpServer = http.createServer(app)
const io = new ioServer(httpServer)

//middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

//session
// app.use(
//     session({
//         store: new MongoStorage({
//             mongoUrl: envConfig.DB_URI,
//             mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
//             ttl: 30,
//         }),
//         secret: envConfig.SIGNED_COOKIE,
//         resave: false,
//         saveUninitialized: false,
//     })
// )
initializePassport()
app.use(passport.initialize())

//handlebars
app.engine(
    'hbs',
    engine({
        extname: 'hbs',
        defaultLayout: 'main.hbs',
        layoutsDir: process.cwd() + '/src/views/layouts',
    })
)
app.set('views', process.cwd() + '/src/views')
app.set('view engine', 'hbs')
app.use(express.static(process.cwd() + '/src/public'))

//ruta
app.use('/', router)

const connectedServer = httpServer.listen(envConfig.PORT, () => {
    console.log(`Server is up and running on port ${envConfig.PORT}`)
})

connectedServer.on('error', error => {
    console.error('Error: ', error)
})

//socket servidor
sockets(io)

//mongo atlas
connectDb()
