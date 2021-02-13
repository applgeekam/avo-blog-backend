let mongoose = require('mongoose')
let bcrypt = require("bcrypt")
const UIDGenerator = require('uid-generator');
const uidgen = new UIDGenerator(UIDGenerator.BASE58); // Default is a 128-bit UID encoded in base58



class User {


    static create(name, email, pwd, cb){

        // Todo Check if this user exist before

        let model = new mongoose.model("User")()
        model.name = name
        model.email = email
        model.date = Date.now()

        this.hashPwd(pwd,  (hash) => {
            model.pwd = hash
            this.tokenGenerator((token) => {
                model.token = token
                model.save((err, doc) => {
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