const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const path = require('path')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const morgan = require('morgan')
const mongoose = require('mongoose')
const connectDB = require('./config/db.js')
const MongoStore = require('connect-mongo')

// Load config
dotenv.config({ path: '.env' })

// Passport Config
require('./config/passport')(passport)

connectDB()

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }

app.get('/', (req, res) => {
    res.send('<h1>Smokey</h1>')
})


app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))