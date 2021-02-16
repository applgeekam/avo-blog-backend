let db = require('mongoose')
let luxon = require("luxon")


module.exports = function (request, response, next) {
    const token = request.header("authorization").split(" ")[1]

    if (token === undefined)
    {
        response.json({
            status: {
                success : false,
                message: "Token is missing on Authorization Header request. :("
            },
            data: null
        })
    }

    let model = new db.model("user")
    model.find({
        "token.value" : token
    }).exec((err, user) => {
        if (err)
        {
            response.json({
                status: {
                    success : false,
                    message: "Something goes wrong on db. Error: " + err
                },
                data: null
            })
        }
        else if(user.length === 0)
        {
            response.json({
                status: {
                    success : false,
                    message: "Session Token not exist :(. Sign in or Login please."
                },
                data: null
            })
        }
        else {
            user = user[0]
            let now = luxon.DateTime.now()
            let later = user.token.expiration
            let i = luxon.Interval.fromDateTimes(now, later).length("hours");
            if (i > 0)
            {
                model.updateOne( { _id: user._id },
                [ { $set: { "token.expiration": luxon.DateTime.fromJSDate(user.token.expiration).plus(luxon.Duration.fromObject({ minutes: 1})).toLocal() }}], error => {
                        if (error)
                        {
                            response.json({
                                status: {
                                    success : false,
                                    message: "Something goes wrong on db. Error: " + err
                                },
                                data: null
                            })
                        }
                        else {
                            next()
                        }
                    }
                )
            }
            else {
                response.json({
                    status: {
                        success : false,
                        message: "Session Token is expired. Please login again."
                    },
                    data: null
                })
            }
        }
    })

}