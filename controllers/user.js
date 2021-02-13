let express = require('express')
const router = express.Router();
let User = require('../models/User')
let biblio = require('../biblio')

// const token = req.header("authorization");


router.post('/login', ((req, res) => {

}))


router.post('/signup', ((req, res) => {

    let response = {}

    // Todo check if data is valid before
    if (!biblio.ValidateEmail(req.body.email))
    {
        response.status.type = "error"
        response.status.message = " Email invalide. "
    }

    User.create(req.body.name,req.body.email, req.body.password, (err, token) => {
        if (err)
        {
            res.status(500).send("Sign in failed. Try again")
        }
        else
        {
            res.json({
                status: {
                    type : "success",
                    message: "User sign in"
                },
                token
            }).send()
        }
    } )
}))

router.post('/logout', ((req, res) => {

}))
module.exports = router;