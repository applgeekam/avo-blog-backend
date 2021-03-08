let express = require('express')
let bodyParser = require('body-parser')
let app = express()
let initConnectionDb = require("./connectionDB")
require('dotenv').config();


const PORT = process.env.PORT

// Middlewares
app.use('/image', express.static('public/image'))
app.use(bodyParser.urlencoded({ extended : false}))
app.use(bodyParser.json())
initConnectionDb()
// Routes

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header("Access-Control-Allow-Credentials", "true")
    res.header("Access-Control-Allow-Methods", "GET,POST")
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization")
    next()
})

app.get("/", (req, res) => {
    res.send("Welcome on Avo Blog API.")
})


app.use("/article", require('./controllers/article'))

// Authentication routes

app.use("/user", require('./controllers/user'))

// Authenticated routes

app.use('/comment', require('./controllers/comment'))

app.listen(PORT, () =>{
    console.log("Server running on " + PORT + " !")
})

