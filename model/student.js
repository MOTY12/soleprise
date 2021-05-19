const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    fullname: {
        type: String
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classes',
        require: true
    },
    cardid: {
        type: String
    },
    photo: {
        type: String
    },
    studentid: {
        type: String
    },
    dob: {
        type: String
    },
    address: {
        type: String
    }
})

//to change _id to id for frontend friendly use 
studentSchema.virtual('id').get(function (){
    return this._id.toHexString()
})
studentSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Student', studentSchema)