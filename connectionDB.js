const mongoose = require("mongoose")
require('dotenv').config();

const host = process.env.NODE_ENV === "development" ? process.env.MONGO_DEV_HOST : process.env.MONGO_PROD_HOST

module.exports = function initConnectionDB()
{
    mongoose.connect(`mongodb://${host}:27017/avo`,{ useNewUrlParser: true, useUnifiedTopology: true } , (error) => {
        if (!error)
        {
            console.log("Connection success")

            const InitDBSchema = require("./models/schema")

            InitDBSchema()
        }
        else
        {
            console.log("Connection failed. Error: " + error)
        }
    })

}
