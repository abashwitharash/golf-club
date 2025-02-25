const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Render index.ejs, passing in all of the current user's
    res.render('golfs/index.ejs', {
      golfs: currentUser.golfs,
    });
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});

   
  router.get('/new', async (req, res) => {
    res.render('golfs/new.ejs');
  });


router.post('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.golfs.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/golfs`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});



router.get('/:golfId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const golf = currentUser.golfs.id(req.params.golfId);
    res.render('golfs/show.ejs', {
      golf: golf,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


router.delete('/:golfId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.golfs.id(req.params.golfId).deleteOne();
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/golfs`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/:golfId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const golf = currentUser.golfs.id(req.params.golfId);
    res.render('golfs/edit.ejs', {
      golf: golf,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.put('/:golfId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const golf = currentUser.golfs.id(req.params.golfId);
    golf.set(req.body);
    await currentUser.save();
    res.redirect(
      `/users/${currentUser._id}/golfs/${req.params.golfId}`
    );
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


router.put('/users/vip', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const golf = currentUser.golfs.id(req.params.golfId);
    golf.set(req.body);
    await currentUser.save();
    res.redirect(
      `/users/${currentUser._id}/vip/${req.params.golfId}`
    );
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/community/:userId/:golfId', async (req, res) => {
  try {
      console.log(req.params)
    const communityUser = await User.findById(req.params.userId);
    console.log(communityUser)
    const golf = communityUser.golfs.id(req.params.golfId);
    console.log(golf)
    
    
    res.render('golfs/vip.ejs', {
      golf: golf,
    });
  } catch (error) {
    
    console.log(error);
    res.redirect('/');
  }
});


module.exports = router;
