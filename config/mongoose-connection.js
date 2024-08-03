const mongoose = require("mongoose")
const debug = require("debug")("development:mongoose")
const config = require("config")

mongoose
.connect(`${config.get("MONGODB_URI")}/Games-Mania`)
.then(()=>{
    debug("connected")
})
.catch((err)=>{
    debug(err)
})

module.exports = mongoose.connection