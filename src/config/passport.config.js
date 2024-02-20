import passport from 'passport'
import local from 'passport-local'
import GitHubStrategy from 'passport-github2'

import { userApi } from '../controllers/User.controller.js'
import { createHash, isValidPassword } from '../utils/utils.js'
import { envConfig } from '../config/env.config.js'

const LocalStrategy = local.Strategy

const initializePassport = () => {
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
                        console.log(newUser)
                        let result = await userApi.create(newUser)

                        done(null, result)
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
            { passReqToCallback: true, usernameField: 'email' },
            async (req, username, password, done) => {
                const { first_name, last_name, email, age } = req.body
                try {
                    //const user = await userModel.findOne({email : username});
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
                    //let result = await userModel.create(newUser)
                    let result = await userApi.create(newUser)
                    return done(null, result)
                } catch (error) {
                    return done('User Not fount' + error)
                }
            }
        )
    )

    passport.use(
        'login',
        new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, email, password, done) => {
            try {
                //const user = await userModel.findOne({ email: email })
                const user = await userApi.findUserByEmail(email)
                console.log(' User login ' + user)

                if (!user) {
                    return done(null, false)
                }

                if (!isValidPassword(user, password)) {
                    return done(null, false)
                }

                return done(null, user)
            } catch (error) {
                console.log(error)
                return done(null, false)
            }
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        // let user = await userModel.findById(id)
        let user = await userApi.getOne(id)
        done(null, user)
    })
}

export default initializePassport
