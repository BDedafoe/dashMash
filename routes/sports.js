const express = require('express')
const router = express.Router()
require('dotenv').config()
const axios = require('axios')
const sportsAPI = require('../config/api/sportsAPI')
const { ensureAuthenticated } = require('../middleware/auth');

// //index page
router.get('/', ensureAuthenticated, (req, res) =>
  res.render('sports', {
    user: req.user
  })
);

router.post('/', ensureAuthenticated, (req, res) => {
    return res.send([req.params.sport_key])
   
})

module.exports = router;



