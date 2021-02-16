let express = require('express')
let bodyParser = require('body-parser')
let app = express()
let initConnectionDb = require("./connectionDB")
require('dotenv').config();


const PORT = process.env.PORT

// Middlewares
app.use('/images', express.static('public/images'))
app.use(bodyParser.urlencoded({ extended : false}))
app.use(bodyParser.json())
initConnectionDb()
// Routes

app.get("/", (req, res) => {
    res.send("Welcome on Avo Blog API.")
})

// Todo define env variable for token session and port

app.use("/article", require('./controllers/article'))

// Authentication routes

app.use("/user", require('./controllers/user'))

// Authenticated routes

app.use('/comment', require('./controllers/comment'))

app.listen(PORT, () =>{
    console.log("Server running on " + PORT + " !")
})

