const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: String,
    image: Buffer,
    price: Number,
    discount: {
        type: Number,
        default: 0
    },
})

module.exports = mongoose.model("product", productSchema)