let express = require('express')
let bodyParser = require('body-parser')
let app = express()
let authMiddleware = require("./middlewares/auth")
let initConnectionDb = require("./connectionDB")

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

app.post("/comment", authMiddleware, (req, res) => {})
app.post("/reply/:id", authMiddleware, (req, res) => {})

app.listen(8180)

