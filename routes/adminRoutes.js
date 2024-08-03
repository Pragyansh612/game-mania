const express = require("express")
const router = express.Router()
const cookieparser = require("cookie-parser")
const { createAdmin, loginAdmin, logout } = require("../controllers/adminController")
const adminlog = require("../middlewares/adminLog")
const upload = require("../config/multer-config")
const productModel = require("../models/products")

router.use(cookieparser())

router.get("/home", adminlog, (req, res) => {
    let admin = req.admin
    let message = req.flash("message")
    res.render("admin/adminhome", { url: req.protocol + "://" + req.headers.host, admin, message })
})
router.get("/register", (req, res) => {
    res.render("admin/adminregister", { url: req.protocol + "://" + req.headers.host })
})
router.get("/login", (req, res) => {
    let error = req.flash("error")
    res.render("admin/adminlogin", { url: req.protocol + "://" + req.headers.host, error })
})
router.get("/createGames", adminlog, (req, res) => {
    res.render("admin/create-games", { url: req.protocol + "://" + req.headers.host })
})
router.get("/logout", adminlog, logout)

router.post("/create", createAdmin)
if (process.env.NODE_ENV === "development") {

}

router.post("/login", loginAdmin)
router.post("/creategames", adminlog, upload.single("image"), async (req, res) => {
    try {let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body
    let product = await productModel.create({
        image: req.file.buffer, name, price, discount, bgcolor, panelcolor, textcolor
    })
    req.flash("message", "Product Created Succesfully"),
    res.redirect("/admin/home")
}
    catch(err){
        res.send(err.message)
    }
})

module.exports = router