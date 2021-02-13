const mongoose = require("mongoose")

module.exports = function initConnectionDB()
{
    mongoose.connect("mongodb://localhost:27017/avo",{ useNewUrlParser: true, useUnifiedTopology: true } , (error) => {
        if (!error)
        {
            console.log("Connection success")
        }
        else
        {
            console.log("Connection failed")
        }
    })

    const InitDBSchema = require("./models/schema")

    InitDBSchema()

}
