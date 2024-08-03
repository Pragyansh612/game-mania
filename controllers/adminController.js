const adminModel = require("../models/admin")
const generateToken = require("../util/generateToken")
const bcrypt = require("bcrypt")

module.exports.createAdmin = async (req, res) => {
    try {
        let { email, fullname, password, gstno } = req.body
        let admin = await adminModel.findOne()
        if (admin) {
            req.flash("error", "Admin already exists")
            return res.redirect("/")
        }
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return console.log(err.message)
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return console.log(err.message)
                let admin = await adminModel.create({
                    email,
                    fullname,
                    password: hash,
                    gstno
                })
                let token = generateToken(admin)
                res.cookie("token", token)
                res.redirect("/admin/home")
            })
        })
    } catch (err) {
        console.log(err.message)
    }
}

module.exports.loginAdmin = async (req, res) => {
    let { email, password } = req.body
    let admin = await adminModel.findOne({ email: email })
    if (!admin) return res.send("User doesn't Exists")

    bcrypt.compare(password, admin.password, (err, result) => {
        if (result) {
            let token = generateToken(admin)
            res.cookie("token", token)
            res.redirect("/admin/home")
        } else {
            res.send("Wrong password")
        }
    })
}

module.exports.logout = (req, res) => {
    res.cookie("token", "")
    res.redirect("/")
}