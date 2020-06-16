const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

//user credentila schema in db
var userSchema = new mongoose.Schema ({
     username: String,
     password: String
})

//plug passport local mongoose in schema
userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", userSchema)
