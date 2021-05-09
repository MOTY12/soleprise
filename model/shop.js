const mongoose = require('mongoose')

const shopSchema = new mongoose.Schema({
    storeimage: {
        type: String,
        default: ' '
    },
    storename: {
        type: String,
        default: ' '
    },
    storeOwner: {
        type: String,
        default: ' '
    },
    storenumber: {
        type: String,
        default: '0'
    },
    location: {
        type: String,
        default: ' '
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
        
    }

})

//to change _id to id for frontend friendly use 
shopSchema.virtual('id').get(function (){
    return this._id.toHexString()
})
shopSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Shop', shopSchema)