const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../middleware/auth');

router.get('/', ensureAuthenticated, (req, res) =>
  res.render('finance', {
    user: req.user
  })
);

module.exports = router;