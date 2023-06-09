const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        orderItems: [],
        shippingAddress:{type: Object},
        orderAmount:{type: Number, required:true},
        isDelivered:{type: Boolean, required:false},
        transactionId:{type:String,required:true}
    },
    { timestamps:true,
    })

module.exports = mongoose.model("Order", orderSchema);