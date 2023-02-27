const mongoose = require('mongoose')
const {Schema, model} = require("mongoose")
const UserSchema = new Schema({
    name: {
        type:String,
        require: "Name is required"
    },
    email: {
        index: {unique:true},
        type:String,
        require: "Email is required"
    },
    password: {
        type:String,
        require: "Password is required"
    }
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel