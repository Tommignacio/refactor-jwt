import mongoose from 'mongoose'

// export const cartItemSchema = new mongoose.Schema(
//     {
//         product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//         quantity: {
//             type: Number,
//             default: 0,
//         },
//     },
//     { _id: false } // Esto evita que se genere un _id para los elementos del array
// )

export const cartSchema = new mongoose.Schema(
    {
        products: {
            type: [
                {
                    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
                    quantity: {
                        type: Number,
                        default: 0,
                    },
                },
            ],
            default: [],
        },
    },
    { timestamps: true, versionKey: false }
)

cartSchema.pre('findOne', function () {
    this.populate('products.product')
})

export const Cart = mongoose.model('Cart', cartSchema)
