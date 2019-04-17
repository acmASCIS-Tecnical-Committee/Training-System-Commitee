const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const mongodb=require('mongodb');

//Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//Load User model
const User = require('../../models/User');


// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));


// @route   post api/users/register
// @desc    Register user
// @access  Public
router.post('/register',(req,res)=>{

    const{errors,isValid}=validateRegisterInput(req.body);

    //cheack validate 
    if(!isValid){return res.status(400).json(errors);}


    User.findOne({email:req.body.email}).then(user=>{
        
   
    //cheak if is a user
    if(user){
        errors.email='Email is Alreay exist';
        return res.status(400).json(erroes);
    }
    else{
      const mentor=req.body.name;
      const avatar=URL(req.body.url);
    //create new user in databasse
        const newUser=new User({
            name:req.body.name,
            email:req.body.email,
            phoneNumber :req.body.phoneNumber,
            problemsCount:req.body.problemsCount,
            role:req.body.role,
            handels:{
                judge:req.body.judge,
                handle:req.body.handle
            },
            password:req.body.password,

            lastOnline:{
                judge : req.body.judge,
                lastVisit :req.body.Date.now(),
            },
            freetime:{
                from:req.body.from,
                to:req.body.to
            },
            registrationDate:req.body.Date.now(),
            confirmation,
        });

        //encript the password 
        bcrypt.genSalt(15,(err,salt)=>{
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                if(err)throw err;
                newUser.password=hash;
                newUser.save().
                then(user=>res.json(user)).
                catch(err=>console.log(err));
            });
        });
    }
});
});




// @route  post api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public

router.post('/login',(req,res)=>{
const { errors, isValid } = validateLoginInput(req.body);


  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }


  const email=req.body.email;
  const password=req.body.password;

  //finduser by email
User.findOne({email}).then(user=>{
    if(!user){errors.email="Email not found";
    res.status(404).json(errors);}

 // Check Password
 bcrypt.compare(password, user.password).then(isMatch => {
    if (isMatch) {
      // User Matched
      //create payload
      const payload = {
        id: user.id,
        name: user.name,
        phoneNumber:user.phoneNumber,
        problemsCount:user.problemsCount,
        role:user.role,
        lastOnline:{
              judge:user.judge,
              lastVisit:user.lastVisit },
              handles:{
                  judge:user.judge,
                  handle:user.handle
              },
        freetime:{
                  from:user.from,
                  to:user.to
              },
        registrationDate:user.registrationDate,
        confirmation:user.confirmation
 }; // Create JWT Payload

      // Sign Token
      jwt.sign(
        payload,
        keys.secretOrKey,
        { expiresIn: 3600 },
        (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token
          });
        }
      );
    } else {
      errors.password = 'Password incorrect';
      return res.status(400).json(errors);
    }
  });
});
});




// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        phoneNumber:user.phoneNumber,
        problemsCount:user.problemsCount,
        role:user.role,
        lastOnline:[{
              judge:user.judge,
              lastVisit:user.lastVisit }],
              handles:[{
                  judge:user.judge,
                  handle:user.handle
              }],
        freetime:[{
                  from:user.from,
                  to:user.to
              }],
        registrationDate:user.registrationDate,
        confirmation:user.confirmation
      });
    }
  );
  module.exports=router;
