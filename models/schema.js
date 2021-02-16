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

let Article = mongoose.Schema({
    title: String,
    author: String,
    slug: String,
    resume: String,
    like: Number,
    dateAdd: Date,
    datePub: Date,
    img: String,
    _article_content_id: mongoose.Schema.Types.ObjectId,
})

let ArticleContent = mongoose.Schema({
    comments : Array,
    tags: Array,
    section: [
        {
            title: String,
            img: String,
            paragraphs: [
                {
                    img: String,
                    text: String,
                    quotes: String,
                }
            ]
        }
    ],
})

let Comment = mongoose.Schema({
    users_id:  mongoose.Schema.Types.ObjectId,
    articles_id:  mongoose.Schema.Types.ObjectId,
    users_name: String,
    dateAdd: Date,
    message: String,
    reply: Array,
})

module.exports = function initSchema() {
    mongoose.model("user", User);
    mongoose.model("article_content", ArticleContent);
    mongoose.model("article", Article);
    mongoose.model("comment", Comment);
}
