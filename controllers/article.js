let express = require('express')
const router = express.Router();

let Articles = require("../models/Articles")

router.get("/", (req, res) => {
    Articles.getAll((err, articles) =>{
        if (err)
        {
            res.json({
                status: {
                    success : false,
                    message: "Error + " + err
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
    let slug = req.params.slug ?? ""
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

router.get("/:id/like", (req, res) => {
    let id = req.params.id ?? ""
    Articles.like(id, (msg, success) => {
        res.json({
            status: {
                success : success,
                message: msg
            },
            data: null
        })
    })
})

router.get("/:id/unlike", (req, res) => {
    let id = req.params.id ?? ""
    Articles.unlike(id, (msg, success) => {
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