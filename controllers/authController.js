const userModel = require("../models/users")
const generateToken = require("../util/generateToken")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports.createUser = async (req, res) => {
    try {
        let { email, username, fullname, password, contact, age } = req.body
        let user = await userModel.findOne({ email })
        if (user) return res.send("User already exists")
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return console.log(err.message)
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return console.log(err.message)
                let user = await userModel.create({
                    email,
                    username,
                    fullname,
                    password: hash,
                    contact,
                    age
                })
                let token = generateToken(user)
                res.cookie("token", token)
                res.redirect("/home")
            })
        })
    } catch (err) {
        console.log(err.message)
    }
}

module.exports.loginUser = async (req, res) => {
    let { email, password } = req.body
    let user = await userModel.findOne({ email: email })
    if (!user) return res.send("User doesn't Exists")

    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            let token = generateToken(user)
            res.cookie("token", token)
            res.redirect("/home")
        } else {
            req.flash("error", "Login First")
            res.redirect('/login')
        }
    })
}

module.exports.logout = (req, res) => {
    res.cookie("token", "")
    res.redirect("/")
}