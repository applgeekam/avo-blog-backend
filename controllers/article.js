let express = require('express')
const router = express.Router();

let authMiddleware = require("../middlewares/auth")


let Articles = require("../models/Articles")


router.get("/", (req, res) => {
    Articles.getAll((err, articles) =>{
        if (err)
        {
            res.json({
                status: {
                    success : false,
                    message: "Error : " + err
                },
                data: null
            })
        }
        else {
            res.json({
                status: {
                    success : true,
                    message: ""
                },
                data: articles
            })
        }
    })
})

router.get("/:slug", (req, res) => {
    let slug = req.params.slug ? req.params.slug : ""
    if (slug.length === 0 || typeof slug !== 'string')
    {
        res.json({
            status: {
                success : false,
                message: "Article slug is invalid"
            },
            data: null
        })
    }
    else
    {
        Articles.getOne(slug, (success, msg, article) =>{
            res.json({
                status: {
                    success : success,
                    message: msg
                },
                data: article
            })
        })
    }

})

router.post("/:id/like", authMiddleware,  (req, res) => {
    let article_id = req.params.id ? req.params.id : ""
    let user_id = req.body.id ? req.body.id : ""
    Articles.like(article_id, user_id, (msg, success) => {
        res.json({
            status: {
                success : success,
                message: msg
            },
            data: null
        })
    })
})

router.post("/:id/unlike", authMiddleware, (req, res) => {
    let article_id = req.params.id ? req.params.id : ""
    let user_id = req.body.id ? req.body.id : ""
    Articles.unlike(article_id, user_id, (msg, success) => {
        res.json({
            status: {
                success : success,
                message: msg
            },
            data: null
        })
    })
})

module.exports = router;