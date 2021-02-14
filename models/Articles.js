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
                    article = { article, content}
                    cb(true, "", article)
                })
            }
            else{
                cb(false, "Article not found", article)
            }
        })
    }

    static unlike(id, cb)
    {
        let model = new db.model("article")
        if (db.Types.ObjectId.isValid(id))
        {
            model.findById(id, (err, article) => {
                if (err)
                {
                    cb("Something goes wrong on db. Error: " + err, false)
                }
                else if(article === null)
                {
                    cb(" Article not found ", false)
                }
                else {
                    article.like--
                    article.save((err) => {
                        cb("Article unliked.", true)
                    })
                }
            })
        }
        else{
            cb("Article id is invalid", false)
        }

    }


    static like(id, cb)
    {
        let model = new db.model("article")
        if (db.Types.ObjectId.isValid(id))
        {
            model.findById(id, (err, article) => {
                if (err)
                {
                    cb("Something goes wrong on db. Error: " + err, false)
                }
                else if(article === null)
                {
                    cb(" Article not found ", false)
                }
                else {
                    article.like--
                    article.save((err) => {
                        cb("Article liked.", true)
                    })
                }
            })
        }
        else{
            cb("Article id is invalid", false)
        }

    }
}

module.exports = Articles