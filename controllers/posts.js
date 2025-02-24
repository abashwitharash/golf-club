const express = require('express');
const router = express.Router();

const User = require('../models/user.js');


router.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect(`/users/${req.session.user._id}/posts`);
    } else {
        res.render('index.ejs');
    }
});



module.exports = router;
