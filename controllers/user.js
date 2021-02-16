let express = require('express')
const router = express.Router();
let User = require('../models/User')
let biblio = require('../biblio')


router.post('/login', ((req, res) => {
    let email = req.body.email ?? ""
    let password = req.body.password ?? ""

    if (!biblio.ValidateEmail(email))
    {
        res.json({
            status: {
                success : false,
                message: " Email is invalid. "
            },
            data: null
        }).send()
    }
    else{
        User.connect(email, password,(success, msg, data) => {
            res.json({
                status: {
                    success : success,
                    message: msg
                },
                data: data
            }).send()
        } )

    }
}))

router.post('/signup', ((req, res) => {

    let email = req.body.email ?? ""
    let name = req.body.name ?? ""
    let password = req.body.password ?? ""

    if (!biblio.ValidateEmail(email))
    {
        res.json({
            status: {
                success : false,
                message: " Email is invalid. "
            },
            data: null
        }).send()
    }
    else if (password.length < 8){
        res.json({
            status: {
                success : false,
                message: "Password must contain at least 8 characters "
            },
            data: null
        }).send()
    }
    else if (name.length === 0){
        res.json({
            status: {
                success : false,
                message: "Name field is empty"
            },
            data: null
        }).send()
    }
    else{
        User.create(name, email, password, (success, msg, data) => {
            res.json({
                status: {
                    success : success,
                    message: msg
                },
                data: data
            }).send()
        } )

    }


}))

router.post('/logout', ((req, res) => {
    const token = req.header("authorization").split(" ")[1]
    User.disconnect(token, (success, msg, data) => {
        res.json({
            status: {
                success : success,
                message: msg
            },
            data: data
        }).send()
    } )
}))

module.exports = router;