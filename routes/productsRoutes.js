const express = require("express")
const router = express.Router()
const producModel = require("../models/products")
const isLoggedin = require("../middlewares/isLoggedin")

router.get("/", async (req, res)=>{
    let products = await producModel.find()
    res.render("user/products", { url: req.protocol + "://" + req.headers.host, products })
})


module.exports = router