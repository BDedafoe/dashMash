const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../middleware/auth');

router.get('/', ensureAuthenticated, (req, res) =>
  res.render('news', {
    user: req.user
  })
);

module.exports = router;