
// import pkgs
const 
express = require('express'),
expressSession = require('express-session'),
bd = require('body-parser'),
mongoose = require('mongoose'),
passport = require('passport'),
localStrategy = require('passport-local'),
passportLocalMongoose = require('passport-local-mongoose'),
app = express(),
User = require('./models/user.js')

//=====setup=====

//view engine
app.set("view engine", "ejs")

//body-parser
app.use(bd.urlencoded({extended: true}))

//serve assets
app.use(express.static("public"))

//initial expressSession
app.use(expressSession({
     secret: "String to encode and decode the session",
     resave: false,
     saveUninitialized: false
}))

//use Passport lib
app.use(passport.initialize())
app.use(passport.session())



//apply authenticaiton
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


//mongodb connection
mongoose.connect("mongodb+srv://guanyucao:0311@cluster0-tfv9q.mongodb.net/market?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})

//item post data schema
const ItemSchema = new mongoose.Schema({
     name: String,
     price: Number,
     body: String,
     negotiable: String,
     created: {type: Date, default: Date.now()}
})

//mongoose model
const item = mongoose.model("Item", ItemSchema)


//=====routes=====

//home
app.get("/", (req, res) => {
     res.render("index")
})
history
//auth
//login
app.get("/login", (req, res) => {
     res.render("login")
})

app.post("/login", passport.authenticate("local", {
     failureRedirect: "/login",//if not verified, back to login page
     successRedirect: "/market"//if verified, go to market page
}), (req, res) => {})

//signup
app.get("/register", (req, res) => {
     res.render("register")
})

app.post("/register", (req, res) => {

     //check if password match confirm password
     if (req.body.password === req.body.cpassword) {
          //if match, register the user with hashed password by "passport"
     User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
          if (err) {
               console.log(err)
               res.render('register')
          } else {
               passport.authenticate("local")(req, res, function(){
                    res.redirect('/market')
               })
               
          }}
          
     )} else {
          console.log("Password not same");
          res.redirect("register")//if not match, back to register page
     }
})

//logout
app.get("/logout", (req, res) => {
     req.logOut()//logout user and destroy the session
     res.redirect("/")//back to home page
})



//market
app.get("/market", isLogedIn, (req, res) => {
     //retrieve all items in db
     item.find({}, (err, items) => {
          if (err) {
               console.log(err);
          } else {
               res.render("market", {items: items})
          }
     })
     
})
app.post("/market", (req, res) => {
     //create the new item post in db
     item.create(req.body)
     //back to market page 
     res.redirect("/market") 
})

//new post
app.get("/market/new", isLogedIn, (req, res) => {
     res.render("newpost")
})



//=====middleware=====
//check if user already authenticated 
function isLogedIn(req, res, next){ 
     if (req.isAuthenticated()) {
          return next()
     } 
     res.redirect('/login')
} 


//server
app.listen(3000, () => {
   console.log("Server running...");
     })