const express = require('express');

const router = express.Router();

router.get('/', ( req , res ) => {
    if(req.user) return res.redirect('dashboard');
    res.render('index');
});

router.get('/signup', ( req , res ) => {
    if(req.user) return res.redirect('dashboard');
    res.render('signup');
});

module.exports = router;