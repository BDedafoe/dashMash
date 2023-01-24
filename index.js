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

// Load config
dotenv.config({ path: '.env' })

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
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
    res.send('You did it!')
})


app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))