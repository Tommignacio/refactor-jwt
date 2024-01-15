'use strict'

import { UserMongoDd } from '../dao/manager/mongoDb/User.mongoDb.js'

export const userApi = new UserMongoDd()

export const userRegister = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body
        const user = {
            first_name,
            last_name,
            email,
            age,
            password,
            role: req.isAdmin ? 'admin' : 'user',
        }
        const newUser = await userApi.create(user)
        res.status(200).json({ message: 'user created', payload: newUser })
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
}

export const userLogged = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userApi.findUserByEmailPassw(email, password)
        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            role: user.role,
        }
        res.status(200).json({ message: 'user founded succesfully', payload: req.session.user })
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
}

export const userLogout = async (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ error: 'Error al cerrar sesión' })
            }
            res.clearCookie('connect.sid') // Limpiar la cookie de sesión
            res.status(200).json({ message: 'Logout exitoso' })
        })
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
}
