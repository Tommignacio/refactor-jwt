import passport from 'passport'
import local from 'passport-local'
import GitHubStrategy from 'passport-github2'

import { userApi } from '../controllers/User.controller.js'
import { createHash, isValidPassword } from '../utils/utils.js'
import { envConfig } from './env.config.js'
import jwt, { ExtractJwt } from 'passport-jwt'

import jsonwebtoken from 'jsonwebtoken'

const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy

const cookieExtractor = req => {
    let token = null
    if (req && req.cookies) {
        token = req.cookies[envConfig.SIGNED_COOKIE]
    }
    return token
}

const initializePassport = () => {
    passport.use(
        'jwt',
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
                secretOrKey: envConfig.TOKEN_SECRET,
            },
            async (jwt_payload, done) => {
                try {
                    return done(null, jwt_payload)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use(
        'github',
        new GitHubStrategy(
            {
                clientID: envConfig.CLIENT_ID,
                clientSecret: envConfig.CLIENT_SECRET,
                callbackURL: 'http://localhost:8080/api/sessions/githubcallback',
            },
            async (accesToken, refreshToekn, profile, done) => {
                try {
                    let user = await userApi.findUserByEmail(profile._json.email)
                    if (!user) {
                        let newUser = {
                            first_name: profile._json.name,
                            last_name: '',
                            email: profile._json.email,
                            age: '',
                            password: '',
                            role: 'user',
                            githubAuthenticated: true,
                        }
                        let result = await userApi.create(newUser)
                        // Aquí generas el token JWT
                        const token = jsonwebtoken.sign({ userId: result._id }, envConfig.TOKEN_SECRET)
                        // Envías el token en la respuesta
                        return done(null, { user: result, token })
                    } else {
                        // Aquí generas el token JWT
                        const token = jsonwebtoken.sign({ user }, envConfig.TOKEN_SECRET)
                        // Envías el token en la respuesta
                        return done(null, { user, token })
                    }
                } catch (error) {
                    done(error)
                }
            }
        )
    )

    passport.use(
        'register',
        new LocalStrategy(
            { passReqToCallback: true, usernameField: 'email', session: false },
            async (req, username, password, done) => {
                const { first_name, last_name, email, age } = req.body
                try {
                    const user = await userApi.findUserByEmail(username)
                    if (user) {
                        console.log(user)
                        return done(null, false)
                    }
                    const newUser = {
                        first_name,
                        last_name,
                        email,
                        age,
                        password: createHash(password),
                        role: req.isAdmin ? 'admin' : 'user',
                    }
                    let result = await userApi.create(newUser)
                    const token = jsonwebtoken.sign({ user: result }, envConfig.TOKEN_SECRET)
                    req.res.cookie(envConfig.SIGNED_COOKIE, token, { httpOnly: true, secure: true, maxAge: 3600000 })
                    return done(null, result)
                } catch (error) {
                    return done('User Not fount' + error)
                }
            }
        )
    )

    passport.use(
        'login',
        new LocalStrategy(
            { passReqToCallback: true, usernameField: 'email', session: false },
            async (req, email, password, done) => {
                try {
                    const user = await userApi.findUserByEmail(email)
                    console.log(' User login ' + user)

                    if (!user) {
                        return done(null, false)
                    }

                    if (!isValidPassword(user, password)) {
                        return done(null, false)
                    }
                    const token = jsonwebtoken.sign({ user }, envConfig.TOKEN_SECRET)
                    req.res.cookie(envConfig.SIGNED_COOKIE, token, { httpOnly: true, secure: true, maxAge: 3600000 })
                    console.log({ token })
                    return done(null, { user, token })
                } catch (error) {
                    console.log(error)
                    return done(null, false)
                }
            }
        )
    )
}

export default initializePassport
