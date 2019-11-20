const express = require('express');
const router = express.Router();

const User = require('../models/User');
const passport = require ('passport');

router.get('/users/signin', (req, res) => {
  res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
  successRedirect: '/collections',
  failureRedirect: '/users/signin',
  failureFlash: true
}));


router.get('/users/signup', (req, res) => {
  res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const errors = [];
  if (name.length <= 0 ) {
    errors.push({text: 'Please Insert your Name!'});
  }
  if(password != confirm_password){
    errors.push({text: 'Password does not match my dude'});
  }
  if(password.length < 4){
    errors.push({text: 'Password should be more than 4 characters!'});
  }
  if (errors.length > 0) {
    res.render('users/signup', {errors, name, email, password, confirm_password});

  } else {
      const emailUser = await User.findOne({email: email});
      if (emailUser) {
        req.flash('error_msg', 'The Email has been taken');
        res.redirect('/users/signup');

      }
      const newUser = new User({name, email, password});
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash('success_msg', 'you are registered my dude!');
      res.redirect('/users/signin');
  }
});

router.get('/users/logout', (req, res) =>{
  req.logout();
  res.redirect('/');  
});

module.exports = router;
