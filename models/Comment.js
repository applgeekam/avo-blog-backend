let db = require('mongoose')

class Comment {


    static add(article_id, user_id, message, dateAdd, cb) {
        let modelArticle = new db.model("article")
        let modelArticleContent = new db.model("article_content")
        let modelUser = new db.model("user")
        let modelComment = new db.model("comment")
        let comment = {}

        modelUser.findById(user_id, (err, user) => {
            if (err)
            {
                cb(false, "Something goes wrong on db. Error: " + err, null)
            }
            else if(user === null)
            {
                cb(false, " User not found ", null)
            }
            else {
                comment.user_id = user_id
                comment.user_name = user.name

                modelArticle.findById(article_id, (err, article) => {
                    if (err)
                    {
                        cb(false, "Something goes wrong on db. Error: " + err, null)
                    }
                    else if(article === null)
                    {
                        cb(false, " Article not found ", null)
                    }
                    else {
                        comment = new modelComment({
                            users_id:  comment.user_id,
                            articles_id:  article_id,
                            users_name: comment.user_name,
                            dateAdd: dateAdd,
                            message: message,
                            reply: [],
                        })
                        comment.save((err, doc) => {
                            if (err)
                            {
                                cb(false, "Something goes wrong on db. Error: " + err, null)
                            }
                            else {
                                modelArticleContent.updateOne( { _id: article._article_content_id },
                                    [ { $set: { comments : { $concatArrays: [ "$comments", [ doc._id ]  ] } } } ],
                                    (error) => {
                                        if (error)
                                        {
                                            cb(false, "Something goes wrong on db. Error: " + err, null)
                                        }
                                        else {
                                            cb(true, "Comment saved.", null)
                                        }
                                    }
                                )
                            }
                        })
                    }
                })
            }
        })
    }

    static reply(article_id, user_id, message, reply_id, dateAdd, cb){
        let modelArticle = new db.model("article")
        let modelArticleContent = new db.model("article_content")
        let modelUser = new db.model("user")
        let modelComment = new db.model("comment")
        let comment = {}

        modelUser.findById(user_id, (err, user) => {
            if (err)
            {
                cb(false, "Something goes wrong on db. Error: " + err, null)
            }
            else if(user === null)
            {
                cb(false, " User not found ", null)
            }
            else {
                comment.user_id = user_id
                comment.user_name = user.name

                modelArticle.findById(article_id, (err, article) => {
                    if (err)
                    {
                        cb(false, "Something goes wrong on db. Error: " + err, null)
                    }
                    else if(article === null)
                    {
                        cb(false, " Article not found ", null)
                    }
                    else {
                        comment = new modelComment({
                            users_id:  comment.user_id,
                            articles_id:  article_id,
                            users_name: comment.user_name,
                            dateAdd: dateAdd,
                            message: message,
                            reply: [],
                        })
                        comment.save((err, doc) => {
                            if (err)
                            {
                                cb(false, "Something goes wrong on db. Error: " + err, null)
                            }
                            else {

                                modelArticleContent.updateOne( { _id: article._article_content_id },
                                    [ { $set: { comments : { $concatArrays: [ "$comments", [ doc._id ]  ] } } } ],
                                    (error) => {
                                        if (error)
                                        {
                                            cb(false, "Something goes wrong on db. Error: " + err, null)
                                        }
                                        else {
                                            modelComment.updateOne( { _id: reply_id },
                                                [ { $set: { reply : { $concatArrays: [ "$reply", [ doc._id ]  ] } } } ],
                                                (error) => {
                                                    if (error)
                                                    {
                                                        cb(false, "Something goes wrong on db. Error: " + err, null)
                                                    }
                                                    else {
                                                        cb(true, "Comment reply saved.", null)
                                                    }
                                                }
                                            )
                                        }
                                    }
                                )
                            }
                        })
                    }
                })
            }
        })
    }

    static getOne(id, cb)
    {
        let model = new db.model("comment")

        model.findById(id, (err, comment) => {
            if (err)
            {
                cb(false, "Something goes wrong on db. Error: " + err, null)
            }
            else if(comment === null)
            {
                cb(false, "Comment not found", null)
            }
            else {
                cb(true, "", comment)
            }
        })
    }
}

module.exports = Comment