const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema({
    productimage: {
        type: String,
        default: ' '
    },
    productname: {
        type: String,
        default: ' '
    },
    price: {
        type: String,
        default: ' '
    },
    location: {
        type: String
    },
    qty: {
        type: String,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    sku: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }

})

//to change _id to id for frontend friendly use 
inventorySchema.virtual('id').get(function (){
    return this._id.toHexString()
})
inventorySchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Inventory', inventorySchema)