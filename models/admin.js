const mongoose = require("mongoose")

const adminSchema = mongoose.Schema({
    fullname: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unqiue: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    }, 
    products: {
        type: Array,
        default: []
    },
    picture: String,
    gstno: Number
})

module.exports = mongoose.model("admin", adminSchema)