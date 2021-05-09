const mongoose = require('mongoose')

const classSchema = new mongoose.Schema({
    classname: {
        type: String
    },
    classlevel: {
        type: String
    },
    classgroup: {
        type: String
    },
    classhead: {
        type: String
    }
})

//to change _id to id for frontend friendly use 
classSchema.virtual('id').get(function (){
    return this._id.toHexString()
})
classSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Classes', classSchema)