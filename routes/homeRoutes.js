const express = require("express")
const router = express.Router()
const cookieparser = require("cookie-parser")
const isLoggedin = require("../middlewares/isLoggedin")
const { createUser, loginUser, logout } = require("../controllers/authController")
const producModel = require("../models/products")

router.use(cookieparser())

router.get("/", async (req, res) => {
    let error = req.flash("error")
    if (!req.cookies.token) {
        res.render("viewer/home", { url: req.protocol + "://" + req.headers.host, error })
    } else {
        res.redirect("/home")
    }
})
router.get("/home", isLoggedin, async (req, res) => {
    let user = req.user
    let message = req.flash("message")
    let products = await producModel.find()
    res.render("user/home", { url: req.protocol + "://" + req.headers.host, user, products, message })
})
router.get("/create", (req, res) => {
    res.render("viewer/createaccount", { url: req.protocol + "://" + req.headers.host })
})
router.get("/login", (req, res) => {
    let error = req.flash("error")
    res.render("viewer/login", { url: req.protocol + "://" + req.headers.host, error })
})
router.get("/logout", logout)

router.post("/create", createUser)
router.post("/login", loginUser)

module.exports = router