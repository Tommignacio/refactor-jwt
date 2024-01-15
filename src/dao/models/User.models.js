import mongoose from 'mongoose'

const schema = new mongoose.Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, required: true },
        age: { type: Date, required: true },
        password: { type: String, required: true },
        role: { type: String, required: true, enum: ['admin', 'user'] },
    },
    { timestamps: true, versionKey: false }
)

const userModel = mongoose.model('User', schema)

export default userModel
