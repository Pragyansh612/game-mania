const express = require("express")
const isLoggedin = require("../middlewares/isLoggedin")
const router = express.Router()
const userModel = require("../models/users")
const mongoose = require('mongoose');

router.get("/profile", isLoggedin, (req, res) => {
    let user = req.user
    res.render("user/profile", { url: req.protocol + "://" + req.headers.host, user })
})
router.get("/orders", isLoggedin, (req, res) => {
    let user = req.user
    res.render("user/orders", { url: req.protocol + "://" + req.headers.host, user })
})
router.get("/cart", isLoggedin, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate("cart")
    let message = req.flash("message")
    let items = user.cart
    let total = 0
    items.forEach((item) => {
        total += item.price - item.discount
    })
    res.render("user/cart", { url: req.protocol + "://" + req.headers.host, user, items, message, total })
})
router.get("/add/:id", isLoggedin, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email })
    user.cart.push(req.params.id)
    await user.save()
    req.flash("message", "Added to Cart Successfully")
    res.redirect("/")
})
router.get("/delete/:id", isLoggedin, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email }).populate("cart");

        if (!user) {
            req.flash("message", "User not found");
            return res.redirect("/users/cart");
        }
        const idToDelete = new mongoose.Types.ObjectId(req.params.id);
        user.cart.forEach(async (item, index) => {
            if (item._id.equals(idToDelete)) {
                user.cart.splice(index, 1);
                await user.save();
                req.flash("message", "Deleted Successfully");
                res.redirect("/users/cart");
            }
        });

    } catch (error) {
        console.error("Error deleting item:", error);
        req.flash("message", "An error occurred");
        res.redirect("/users/cart");
    }
});

module.exports = router