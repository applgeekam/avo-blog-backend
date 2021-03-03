let db = require('mongoose')


class Articles {

    static getAll(cb)
    {
        let model = new db.model("article")
        model.find({}).exec((err, articles) => {
            cb(err, articles)
        })
    }

    static getOne(slug, cb)
    {
        let modelArticle = new db.model("article")
        modelArticle.find({
            slug : slug
        }).exec((err, article) => {
            if (article.length === 1)
            {
                article = article[0]
                let modelArticleContent = new db.model("article_content")
                modelArticleContent.find({
                    _id: article._article_content_id
                }).exec((err, content) => {
                    content = content[0]
                    article = { article, content}
                    cb(true, "", article)
                })
            }
            else{
                cb(false, "Article not found", article)
            }
        })
    }

    static like(article_id, user_id, cb)
    {
        let model = new db.model("article")

        if (db.Types.ObjectId.isValid(article_id))
        {
            model.updateOne( { _id: article_id },
                { $push: { like : user_id}},
                (error) => {
                    if (error)
                    {
                        cb("Something goes wrong on db. Error: " + err, false)
                    }
                    else {
                        cb("Article liked.", true)
                    }
                }
            )
        }
        else{
            cb("Article id is invalid", false)
        }

    }

    static unlike(article_id, user_id, cb)
    {
        let model = new db.model("article")

        if (db.Types.ObjectId.isValid(article_id))
        {
            model.updateOne( { _id: article_id },
                { $pullAll: { like: [ user_id ] } },
                (error) => {
                    if (error)
                    {
                        cb("Something goes wrong on db. Error: " + error, false)
                    }
                    else {
                        cb("Article unliked.", true)
                    }
                }
            )
        }
        else{
            cb("Article id is invalid", false)
        }

    }
}

module.exports = Articles