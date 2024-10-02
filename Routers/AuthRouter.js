const { register } = require('../Controllers/AuthController');
const { login } = require('../Controllers/AuthController');
const { signUpValidation, LoginValidation } = require('../Middlewears/AuthValidation');

const router = require('express').Router();

router.post('/login', LoginValidation, login);

router.post('/register', signUpValidation, register);

module.exports = router;