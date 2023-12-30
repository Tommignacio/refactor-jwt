import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'


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

cartSchema.pre('find', function() {
    this.populate('products.product');
});

cartSchema.plugin(mongoosePaginate)

export const Cart = mongoose.model('Cart', cartSchema)
