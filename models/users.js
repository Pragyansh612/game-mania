const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unqiue: true,
        lowercase: true,
        trim: true
    },
    username: {
        type: String,
        unqiue: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    age: {
        type: String,
        trim: true
    },
    contact: {
        type: String,
        trim: true
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        default: []
    }],
    orders: {
        type: Array,
        default: []
    },
    picture: String
})

module.exports = mongoose.model("user", userSchema)