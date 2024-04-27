const express = require('express');
const {
    handleUserSignupProcess,
    handleUserLoginProcess
} = require('../controllers/users');

const router = express.Router();

router.post('/create', handleUserSignupProcess);

router.post('/login', handleUserLoginProcess)

module.exports = router;