let express = require('express')
const router = express.Router();
let User = require('../models/User')
let biblio = require('../biblio')
let authMiddleware = require("../middlewares/auth")


router.post('/login', ((req, res) => {
    let email = req.body.email ? req.body.email : ""
    let password = req.body.password ? req.body.password : ""

    if (!biblio.ValidateEmail(email))
    {
        res.json({
            status: {
                success : false,
                message: " Email is invalid. "
            },
            data: null
        })
    }
    else{
        User.connect(email, password,(success, msg, data) => {
            res.json({
                status: {
                    success : success,
                    message: msg
                },
                data: data
            })
        } )

    }
}))

router.post('/signup', ((req, res) => {

    let email = req.body.email ? req.body.email : ""
    let password = req.body.password ? req.body.password : ""
    let name = req.body.name ? req.body.name : ""


    if (!biblio.ValidateEmail(email))
    {
        res.json({
            status: {
                success : false,
                message: " Email is invalid. "
            },
            data: null
        })
    }
    else if (password.length < 8){
        res.json({
            status: {
                success : false,
                message: "Password must contain at least 8 characters "
            },
            data: null
        })
    }
    else if (name.length === 0){
        res.json({
            status: {
                success : false,
                message: "Name field is empty"
            },
            data: null
        })
    }
    else{
        User.create(name, email, password, (success, msg, data) => {
            res.json({
                status: {
                    success : success,
                    message: msg
                },
                data: data
            })
        } )

    }


}))

router.post('/logout', authMiddleware, ((req, res) => {
    const id =  req.body.id ? req.body.id : ""
    User.disconnect(id, (success, msg, data) => {
        res.json({
            status: {
                success : success,
                message: msg
            },
            data: data
        })
    } )
}))

module.exports = router;