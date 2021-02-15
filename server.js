let express = require('express')
let bodyParser = require('body-parser')
let app = express()
let initConnectionDb = require("./connectionDB")

const PORT = 5000

// Middlewares
app.use('/assets', express.static('public'))
app.use('/images', express.static('public/images'))
app.use(bodyParser.urlencoded({ extended : false}))
app.use(bodyParser.json())
initConnectionDb()
// Routes

app.get("/", (req, res) => {
    res.send("Welcome on Avo Blog API.")
})

// todo fill db with generator data
// Todo Manage guest route
// Todo check if data send is valid before : create a middleware
// Todo check if data send exist before
// Todo Manage authenticated route
// Todo Manage authenticated middleware route

app.use("/article", require('./controllers/article'))

// Authentication routes

app.use("/user", require('./controllers/user'))

// Authenticated routes

app.use('/comment', require('./controllers/comment'))

app.listen(PORT, () =>{
    console.log("Server running on " + PORT + " !")
})

