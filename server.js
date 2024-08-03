const express = require("express")
const path = require("path")
const app = express()
const cookieparser = require("cookie-parser")
const db = require("./config/mongoose-connection")
const adminRoutes = require("./routes/adminRoutes")
const usersRoutes = require("./routes/usersRoutes")
const productsRoutes = require("./routes/productsRoutes")
const homeRoutes = require("./routes/homeRoutes")
const expessSession = require("express-session")
const flash = require("connect-flash")
require("dotenv").config()

app.set("view engine", "ejs")
app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.use(expessSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET
}))
app.use(flash())
app.use("/", homeRoutes)
app.use("/admin", adminRoutes)
app.use("/users", usersRoutes)
app.use("/products", productsRoutes)

app.listen(3000, () => {
    console.log("Running")
})