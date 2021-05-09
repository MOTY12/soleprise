const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String
    }
})

//to change _id to id for frontend friendly use 
categorySchema.virtual('id').get(function (){
    return this._id.toHexString()
})
categorySchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Category', categorySchema)