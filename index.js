const express = require('express')
const exphs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

// import routes
const toughtsRoute = require("./routes/toughtsRoutes")
const authRoute = require("./routes/authRoutes")

// import controller
const ToughtController = require('./controllers/ToughtsController')

const app = express()
const port = 3000;

const conn = require('./db/conn')

// Models 

const User = require('./models/User')
const Tought = require('./models/Tought')

app.engine('handlebars', exphs.engine())
app.set('view engine', 'handlebars')

// receber resposta do body
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.use('/toughts', toughtsRoute)
app.get('/', authRoute)

app.get('/', ToughtController.showToughts)

// session middleware
app.use(
    session({
        name: 'session',
        secret: "mh]q9xf:#=CYIw95NNL8q)H0c",
        resave: false, 
        saveUninitialized: false,
        store: new FileStore({
            logFn: function(){},
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie:{
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true,
        }
    })
)

// flash messages 
app.use(flash())

// public path
app.use(express.static('public'))

// set session to res
app.use((req, res, next) => {

    if(req.session.userid){
        res.locals.session = req.session
    }

    next()

})

conn
.sync()
//.sync({force: true})
.then(()=>{
    app.listen(port)
}).catch((err) => console.log(err))