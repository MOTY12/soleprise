const mongoose = require('mongoose')

const Orderitemschema = new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventory',
        require: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    }
})

// //to change _id to id for frontend friendly use 
// OrderitemSchema.virtual('id').get(function (){
//     return this._id.toHexString()
// })
// OrderitemSchema.set('toJSON', {
//     virtuals: true
// })

module.exports = mongoose.model('OrderItem', Orderitemschema)