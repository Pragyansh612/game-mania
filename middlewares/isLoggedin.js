const jwt = require("jsonwebtoken")
const userModel = require("../models/users")

module.exports = async (req, res, next) => {
    if(!req.cookies.token){
        req.flash("error", "Login First")
        return res.redirect("/login")
    }
    try {
        let data = jwt.verify(req.cookies.token, process.env.JWT_KEY)
        let user = await userModel.findOne({email: data.email}).select("-password")
        req.user = user
        next()
    } catch (err) {
        req.flash("error", "Something went wrong")
        res.redirect("/")
    }
}