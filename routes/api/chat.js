const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');
const passport=require('passport');
const Post=require('../../models/Chat');
const validatePostInput = require('../../validation/chat');
// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));
// @route   post api/posts/post
// @desc    create post
// @access  Public
router.post('/',passport.authenticate('jwt',{ session: false}),(req,res)=>{
router.post('/',passport.authenticate(''))
const { errors,isValid }=validatePostInput(req.body);

if(!isValid){
     return res.status(400).json(errors);
}
    const newPost=new Post({

   members:{
       userId:req.user.id,
       lastVisit:req.body.Date.now(),
       Seen: true,
   },
   massages :{
       text : req.body.text,
       senderID :req.body.id,
       sendDate: req.body.Date.now()
   }    
}) ;
 newPost.save().then(post=>res.json(post))
});
module.exports = router;
