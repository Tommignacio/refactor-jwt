'use strict'

import { envConfig } from '../config/env.config.js'
import { UserMongoDd } from '../dao/manager/mongoDb/User.mongoDb.js'

export const userApi = new UserMongoDd()

export const userRegister = async (req, res) => {
    try {
        res.status(201).json({ message: 'user created', payload: req.user })
    } catch (error) {
        console.error('Error during user registration:', error)
        res.status(500).json({ error: 'Server error' })
    }
}

export const failUserRegister = async (req, res) => {
    try {
        res.status(400).json({ error: 'Failed to register user' })
    } catch (error) {
        console.log(error)
        console.error('Error during failed user registration:', error)
        res.status(500).json({ error: 'Server error' })
    }
}

export const userLogged = async (req, res) => {
    try {
        if (!req.user) return res.status(400).send({ status: 'error', error: 'Invalid credentials' })
        res.status(200).json({ message: 'user founded succesfully', payload: req.user })
    } catch (error) {
        console.log('aca')
        console.log(error)
        res.status(500).json({ error: 'Server error' })
    }
}

export const githubCallBack = async (req, res) => {
    try {
        // req.session.user = req.user
        res.redirect('/') //redirije a una pagina(cambiar)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' })
    }
}

export const failUserLogin = async (req, res) => {
    try {
        res.status(400).json({ error: 'Failed to login user' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' })
    }
}
export const userLogout = async (req, res) => {
    try {
        res.cookie(envConfig.SIGNED_COOKIE, '', { expires: new Date(0) })
        res.status(200).json({ message: 'Logout exitoso' })
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
}
