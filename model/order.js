const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true
    }],
    // shippingaddress1:{
    //     type: String,
    //     required: true
    // },
    // shippingaddress2:{
    //     type: String,
    //     required: true
    // },
    // city:{
    //     type: String,
    //     required: true
    // },
    // zip:{
    //     type: Number,
    //     required: true
    // },
    // country: {
    //     type: String,
    //     required: true
    // },
    // phone:{
    //   type: String,
    //   required: true
    // },
    // status:{
    //     type: String,
    //     default: 'pending',
    // },
     totalPrice:{
         type:String
     },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    // },
    dateOrdered:{
        type: Date,
        default: Date.now
    }

})

//to change _id to id for frontend friendly use 
orderSchema.virtual('id').get(function (){
    return this._id.toHexString()
})
orderSchema.set('toJSON', {
    virtuals: true
})


module.exports = mongoose.model('Order', orderSchema)