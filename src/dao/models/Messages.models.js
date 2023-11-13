import mongoose from 'mongoose'

export const messagesSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

export const Messages = mongoose.model('Messages', messagesSchema)
