import { Schema, model } from 'mongoose'

const productSchema = new Schema(
    {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        thumbnail: { type: String },
        description: { type: String, required: true },
        category: { type: String, required: true },
        stock: { type: Number, required: true },
    },
    { timestamps: true, versionKey: false }
)

export const Product = model('Product', productSchema)
