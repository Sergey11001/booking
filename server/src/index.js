const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const imageDownload = require('image-downloader')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const User = require('./models/User')
const dotenv = require('dotenv')
const multer = require('multer')
const {json} = require("express");
dotenv.config()
const PORT = process.env.PORT
const jwtSecret = process.env.SECRET

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))

mongoose.connect('mongodb://127.0.0.1:27017/booking');

const salt = bcrypt.genSaltSync(10)


app.post("/register", (req, res) => {
    const {name, email, password} = req.body
    const user = new User({name, email, password: bcrypt.hashSync(password, salt)})
    user.save((err) => {
        if (err) return res.status(422).json({
            message: "Email is already exist"
        });
        res.send("User created");
    })

})
app.post('/login', (req, res) => {
    const {email, password} = req.body
    console.log({email, password})
    User.findOne({email}, (err, user) => {
        if (err) {
            res.status(404).json({
                message: "Email is wrong"
            })
        }
        const passwordOk = bcrypt.compareSync(password, user.password)
        if (passwordOk) {
            console.log(user)
            jwt.sign(
                {email: user.email, id: user._id, name: user.name},
                jwtSecret,
                {expiresIn: '24h'},
                (err, token) => {
                    if (err) res.json(err)
                    else res.cookie('token', token, {sameSite: "none", secure: true}).json('good auth')
                }
            )

        } else {
            res.status(422).json('pass not ok')
        }
    })
})

app.get('/profile', (req, res) => {
    const {token} = req.cookies

    if (token) {
        jwt.verify(token, jwtSecret, {}, (err, user) => {
            if (err) res.json(err)
            else res.json(user)
        })
    } else {
        res.json(null)
    }
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true)
})

app.post("/upload-by-link", async (req, res) => {
    const {link} = req.body
    const newName = 'photo' + Date.now() + '.jpg'
    try {
        await imageDownload.image({
            url: link,
            dest: __dirname + "/uploads/" + newName
        })
        res.json(newName)
    } catch (e) {
        res.status(404).json({
            message: "Wrong link"
        })
    }

})

const photosMiddleware = multer({dest: 'src/uploads'})
app.post('/upload', photosMiddleware.array('photos', 10), (req, res) => {
    const uploadedFiles = []
    req.files.forEach(file => {
        const {path, originalname, filename} = file
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        const newPath = path + '.' + ext
        fs.renameSync(path, newPath)
        uploadedFiles.push(filename + '.' + ext)
    })
    res.json(uploadedFiles)
})

app.listen(PORT, () => {
    console.log("Server is starting on port", PORT)
})
