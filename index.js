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
const expressLayouts = require('express-ejs-layouts')

// Load config
dotenv.config({ path: '.env' })

// Passport Config
require('./config/passport')(passport)

connectDB()

app.use(expressLayouts)
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
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

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next();
  });

// Routes
app.use('/', require('./routes/index.js'))
app.use('/users', require('./routes/users.js'))
app.use('/auth', require('./routes/auth.js'))

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))