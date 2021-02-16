let express = require('express')
let db = require('mongoose')
let { DateTime } = require("luxon")
DateTime.utc().toLocal();


let authMiddleware = require("../middlewares/auth")
let Comment = require("../models/Comment")

const router = express.Router();

router.post("/", authMiddleware, (req, res) => {
    let comment = {
        article_id : req.body.article ?? "",
        user_id : req.body.user ?? "",
        message: req.body.message ?? "",
    }

    if (!db.Types.ObjectId.isValid(comment.article_id))
    {
        res.json({
            status: {
                success : false,
                message: "Article id is invalid"
            },
            data: null
        })
    }
    else if (!db.Types.ObjectId.isValid(comment.user_id))
    {
        res.json({
            status: {
                success : false,
                message: "User id is invalid"
            },
            data: null
        })
    }
    else if (comment.message.length === 0)
    {
        res.json({
            status: {
                success : false,
                message: "Message is empty."
            },
            data: null
        })
    }
    else
    {
        Comment.add(
            comment.article_id,
            comment.user_id,
            comment.message,
            DateTime.now(),
            (success, msg, data) => {
                res.json({
                    status: {
                        success : success,
                        message: msg
                    },
                    data: data
                })
            }
        )
    }
})

router.get("/:id", authMiddleware, (req , res) => {
    let id = req.params.id ?? ""
    if (!db.Types.ObjectId.isValid(id))
    {
        res.json({
            status: {
                success : false,
                message: "Comment id is invalid"
            },
            data: null
        })
    }
    else
    {
        Comment.getOne(id, (success, msg, article) =>{
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

router.post("/reply/:id", authMiddleware, (req, res) => {
    let comment = {
        article_id : req.body.article ?? "",
        user_id : req.body.user ?? "",
        message: req.body.message ?? "",
        reply_id: req.params.id ?? ""
    }

    if (!db.Types.ObjectId.isValid(comment.article_id))
    {
        res.json({
            status: {
                success : false,
                message: "Article id is invalid"
            },
            data: null
        })
    }
    else if (!db.Types.ObjectId.isValid(comment.user_id))
    {
        res.json({
            status: {
                success : false,
                message: "User id is invalid"
            },
            data: null
        })
    }
    else if (!db.Types.ObjectId.isValid(comment.reply_id))
    {
        res.json({
            status: {
                success : false,
                message: "Comment's id you want to reply to is invalid"
            },
            data: null
        })
    }
    else if (comment.message.length === 0)
    {
        res.json({
            status: {
                success : false,
                message: "Message is empty."
            },
            data: null
        })
    }
    else
    {
        Comment.reply(
            comment.article_id,
            comment.user_id,
            comment.message,
            comment.reply_id,
            DateTime.now(),
            (success, msg, data) => {
                res.json({
                    status: {
                        success : success,
                        message: msg
                    },
                    data: data
                })
            }
        )
    }

})

module.exports = router