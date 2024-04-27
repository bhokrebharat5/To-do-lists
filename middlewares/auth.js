const { getUser } = require('../services/auth');

async function restrictToLoggedInUserOnly( req, res, next ) {
    const uid = req.cookies?.uid;

    if(!uid ) return res.redirect('/');

    const user = getUser( uid );

    if(!user) return res.redirect('/');

    req.user = user;
    next();
}

async function checkAuth( req, res, next ) {

    const uid = req.cookies?.uid;
    const user = getUser( uid );

    req.user = user;
    next();
}


module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth
}