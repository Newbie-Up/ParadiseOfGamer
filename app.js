// import pkgs
const 
express = require('express'),
bd = require('body-parser'),
mongoose = require('mongoose'),
app = express()

//setup

//view engine
app.set("view engine", "ejs")
//body-parser
app.use(bd.urlencoded({extended: true}))
//serve assets
app.use(express.static("public"))


//routes

//home
app.get("/", (req, res) => {
     res.render("index")
})

//login
app.get("/login", (req, res) => {
     res.render("login")
})

//signup
app.get("/register", (req, res) => {
     res.render("register")
})

//market
app.get("/market", (req, res) => {
     res.render("market")
})


//server
app.listen(3000, () => {
   console.log("Server running...");
     })