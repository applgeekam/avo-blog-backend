const mongoose = require("mongoose")

let User = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    date: Date,
    token: {
        value: String,
        expiration: Date
    }
})

module.exports = function initSchema() {
    mongoose.model("User", User);
}
