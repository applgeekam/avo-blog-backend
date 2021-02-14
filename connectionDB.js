const mongoose = require("mongoose")

module.exports = function initConnectionDB()
{
    mongoose.connect("mongodb://localhost:27017/avo",{ useNewUrlParser: true, useUnifiedTopology: true } , (error) => {
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
