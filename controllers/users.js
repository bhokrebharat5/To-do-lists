const User = require('../models/user');
const { setUser } = require('../services/auth');


async function handleUserSignupProcess( req, res ) {

    const {name, email, password, gender } = req.body;

    if(!name || !email || !password || !gender ) {
        res.render('signup', {'status': false, 'msg': 'Please fill the all fields' })
    }

    const getUser = await User.create({
        name,
        email,
        password,
        gender
    });

    res.render('index', {'status': true, 'msg': 'Successfully create a account' })

}

async function handleUserLoginProcess( req, res ) {

    const { email, password } = req.body;

    if(!email || !password ) {
        res.render('index', { status: false, 'msg': 'Please fill the all fields'});
    }

    const getUserByCredentials = await User.findOne({
        email,
        password
    });

    if( getUserByCredentials == '' || !getUserByCredentials ) {
        res.render('index', { status: false, 'msg': 'Invalid email or password!...'});
    }

    const token = setUser( getUserByCredentials );

    res.clearCookie("uid");
    res.cookie('uid', token );

    res.redirect('/dashboard');
}

async function handleUserLogout( req, res ) {
    res.clearCookie("uid");
    res.redirect('/');
}

async function handleGetUserProfile( req, res ) {
    
    if( !req.user._id ) res.redirect('/');
    
    const user = await User.findById(req.user._id);

    let data = {
        name : user.name,
        email: user.email,
        gender: user.gender ,
        profileImage: user.profileImage
    }

    res.render('userEdit', { user : data ,msg:''}); 
}

async function handleUserEditProfile( req, res ) {

    const { name, gender , prevProfileImage} = req.body;
    const filename = req.file?.filename ?? prevProfileImage;
   
    if( !req.user._id ) res.redirect('/');

    await User.findOneAndUpdate(
        { _id: req.user._id},
        { name: name, gender: gender , profileImage : filename }
    )
   const user =  await User.findById({_id: req.user._id});

    res.render('userEdit', {user:user, msg:'Successfully update profile information..', status:true}); 
}

module.exports = {
    handleUserSignupProcess,
    handleUserLoginProcess,
    handleUserLogout,
    handleGetUserProfile,
    handleUserEditProfile
}