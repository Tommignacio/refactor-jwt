import mongoose from 'mongoose'

const schema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: function () {
                // last_name es requerido si no se autenticó con GitHub
                return !this.githubAuthenticated
            },
        },
        email: { type: String, required: true },
        age: {
            type: Date,
            required: function () {
                // age es requerido si no se autenticó con GitHub
                return !this.githubAuthenticated
            },
        },
        password: {
            type: String,
            required: function () {
                // password es requerido si no se autenticó con GitHub
                return !this.githubAuthenticated
            },
        },
        role: { type: String, required: true, enum: ['admin', 'user'] },
        githubAuthenticated: { type: Boolean, default: false },
    },
    { timestamps: true, versionKey: false }
)

const userModel = mongoose.model('User', schema)

export default userModel
