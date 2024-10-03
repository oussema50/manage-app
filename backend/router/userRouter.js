const express = require('express')
const passport = require('passport');
const router = express.Router()
const {registerUser,loginUser,getUserById} = require('../controllers/userController')
const User = require('../models/user')
const {isRH,isEmployee} = require('../middlewares/protectedRoute')
const {postUserRegisterValidator} = require('../utils/validators/userValidator');
const {passportScr }=require('../utils/passport')
passportScr(passport)
router.post('/register',postUserRegisterValidator,registerUser)

router.post('/login',loginUser );
//create other route for user
router.get('/employee/:id',passport.authenticate('jwt', { session: false }), isRH,getUserById)




  // router.get('/rh/dashboard', passport.authenticate('jwt', { session: false }), isRH, (req, res) => {
  //   res.json({ message: 'Welcome to the RH dashboard' });
  // });

  // router.get('/employee/dashboard', passport.authenticate('jwt', { session: false }), isEmployee, (req, res) => {
  //   res.json({ message: 'Welcome to the employee dashboard' });
  // });


module.exports = router