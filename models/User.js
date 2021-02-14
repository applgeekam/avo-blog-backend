let mongoose = require('mongoose')
let bcrypt = require("bcrypt")
let luxon = require("luxon")
const UIDGenerator = require('uid-generator');
const uidgen = new UIDGenerator(UIDGenerator.BASE58); // Default is a 128-bit UID encoded in base58



class User {


    static create(name, email, pwd, cb){

        // Todo Check if this user exist before

        let user = new mongoose.model("User")()
        user.name = name
        user.email = email
        user.date = luxon.DateTime.now()

        this.hashPwd(pwd,  (hash) => {
            user.pwd = hash
            this.tokenGenerator((token) => {
                user.token = {
                    value: token,
                    expiration: luxon.DateTime.now().plus(luxon.Duration.fromObject({ hours: 2}))
                }
                user.save((err, doc) => {
                    cb(err, token)
                })
            })
        })
    }

    static connect(email, pwd) {


    }

    static disconnect(){

    }

    static hashPwd(password, cb)
    {
        const rounds = 10

        bcrypt.hash(password, rounds, (err, hash) => {
            if (err) {
                console.error(err)
                return
            }
            cb(hash)
        })
    }

    static comparePwd(password, hash, cb)
    {
        bcrypt.compare(password, hash, (err, res) => {
            if (err) {
                console.error(err)
                return
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