const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const passport = require('passport');


router.post('/signin', authController.signIn);
router.post('/login', passport.authenticate('local'), authController.logIn);
router.post('/logout', authController.Logout);

module.exports = router;