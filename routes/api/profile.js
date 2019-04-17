const express = require('express');
const router = express.Router();
const mongodb=require('mongodb');
const passport=require('passport');


//Load  Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

// Load Profile Model
const Profile = require('../../models/User');
// Load User Model
const User = require('../../models/User');



// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateProfileInput(req.body);
  
      // Check Validation
      if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
      }
  
      // Get fields from user sceama
      const profileFields = {};
      profileFields.user = req.user.id;
      if (req.body.name) profileFields.name = req.body.name;
      if (req.body.email) profileFields.email = req.body.email;
      if (req.body.phoneNumber) profileFields.phoneNumber = req.body.phoneNumber;
      if (req.body.problemsCount) profileFields.problemsCount = req.body.problemsCount;
    //   // Social
    //   profileFields.social = {};
    //   if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    //   if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    //   if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    //   if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    //   if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
  
      Profile.findOne({ user: req.user.id }).then(profile => {
        if (profile) {
          // Update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(profile => {
              return res.json(profile);
          });
        } else {
          // Create
  
          // Check if email exists
          Profile.findOne({ email: profileFields.email }).then(profile => {
            if (profile) {
              errors.email = 'That email already exists';
              res.status(400).json(errors);
            }
  
            // Save Profile
            new Profile(profileFields).save().then(profile => res.json(profile));
          });
        }
      });
    }
  );
  


// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get( '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const errors = {};
  
      Profile.findOne({ user: req.user.id })
        .populate('user', ['name'])
        .then(profile => {
          if (!profile) {
            errors.noprofile = 'There is no profile for this user';
            return res.status(404).json(errors);
          }
          res.json(profile);
        })
        .catch(err => res.status(404).json(err));
    }
  );



// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', (req, res) => {
    const errors = {};
  
    Profile.findOne({ user: req.params.user_id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          res.status(404).json(errors);
        }
  
        res.json(profile);
      })
      .catch(err =>
        res.status(404).json({ profile: 'There is no profile for this user' })
      );
  });


module.exports = router;
