const jwt = require("jsonwebtoken")
const adminModel = require("../models/admin")

module.exports = async (req, res, next) => {
    if(!req.cookies.token){
        req.flash("error", "Login First")
        return res.redirect("/admin/login")
    }
    try {
        let data = jwt.verify(req.cookies.token, process.env.JWT_KEY)
        let admin = await adminModel.findOne({email: data.email}).select("-password")
        req.admin = admin
        next()
    } catch (err) {
        req.flash("error", "Something went wrong")
        res.redirect("/")
    }
}