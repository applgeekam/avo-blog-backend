
let db = require('mongoose')
let bcrypt = require("bcrypt")
let luxon = require("luxon")
const UIDGenerator = require('uid-generator');
const uidgen = new UIDGenerator(UIDGenerator.BASE58); // Default is a 128-bit UID encoded in base58



class User {


    static create(name, email, pwd, cb){

        let model = new db.model("user")
        model.find({
            email : email
        }).exec((err, user) => {
            if (err)
            {
                cb(false, "Something goes wrong on db. Error: " + err, null)
            }
            else if(user.length === 0)
            {
                let user = new db.model("user")()

                user.name = name
                user.email = email
                user.date = luxon.DateTime.now()
                this.hashPwd(pwd,  (hash) => {
                    user.password = hash
                    this.tokenGenerator((token) => {
                        user.token = {
                            value: token,
                            expiration: luxon.DateTime.now().plus(luxon.Duration.fromObject({ hours: 2}))
                        }
                        user.save((err, doc) => {
                            cb(true, "", token)
                        })
                    })
                })
            }
            else {
                cb(false, "User already exist. Please login.", null)
            }
        })


    }

    static connect(email, pwd, cb) {

        let model = new db.model("user")
        model.find({
            email
        }).exec((err, user) => {
            if (err)
            {
                cb(false, "Something goes wrong on db. Error: " + err, null)
            }
            else if(user.length === 0)
            {
                cb(false, "User not exist. Please Sign up.", null)
            }
            else {
                user = user[0]
                if (user.token.value.length > 0)
                {
                    cb(false, "You are already connected", null)
                }
                else {

                    this.comparePwd(pwd, user.password, (result) => {

                        if (result){

                            this.tokenGenerator((token) => {

                                model.updateOne(
                                    { _id: user._id },
                                    [ { $set: {
                                            "token.value": token,
                                            "token.expiration": luxon.DateTime.now().plus(luxon.Duration.fromObject({ hours: 2}))
                                        }}],
                                    error => {
                                        if (error)
                                        {
                                            cb(false, "Something goes wrong on db. Error: " + err, null)
                                        }
                                        else {
                                            cb(true, "Connected successfully !", token)
                                        }
                                    }
                                )
                            })
                        }
                        else {
                            cb(false, "Your password is incorrect", null)
                        }
                    })
                }

            }
        })

    }

    static disconnect(token, cb){

        let model = new db.model("user")
        model.find({
            "token.value" : token
        }).exec((err, user) => {
            if (err)
            {
                cb(false, "Something goes wrong on db. Error: " + err, null)
            }
            else if(user.length === 0)
            {
                cb(false, "User not exist. Please Sign up.", null)
            }
            else {
                model.updateOne(
                    { _id: user._id },
                    [ { $set: {
                        "token.value": "",
                        "token.expiration": null
                    }}],
                    error => {
                        if (error)
                        {
                            cb(false, "Something goes wrong on db. Error: " + err, null)
                        }
                        else {
                            cb(true, "Disconnected successfully !", null)
                        }
                    }
                )
            }
        })
    }

    static hashPwd(password, cb)
    {
        const rounds = 10

        bcrypt.hash(password, rounds, (err, hash) => {
            if (err) {
                 throw err
            }
            cb(hash)
        })
    }

    static comparePwd(password, hash, cb)
    {
        bcrypt.compare(password, hash, (err, res) => {
            if (err) {
                 throw err
            }
            cb(res) //true or false
        })
    }

    static tokenGenerator(cb)
    {
        uidgen.generate().then(uid => cb(uid));
    }

}

module.exports = User