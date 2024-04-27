const jwt = require('jsonwebtoken');
const PrivateKey = 'Bharat#$&&todolist@4565#984!';

function setUser( user ) {
    const payload = {
        _id: user._id,
        email:user.email
    }
   return jwt.sign(payload, PrivateKey);
}

function getUser( token ) {

    if(!token) return null;

    try{
        return jwt.verify(token,PrivateKey);
    }catch(e) {
        console.log(e);
        return null;
    }
}


module.exports = {
    setUser,
    getUser
}