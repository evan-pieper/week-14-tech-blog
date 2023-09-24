const router = require('express').Router();
const {User, Blogpost} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all CrossSet data and JOIN with user data
    console.log("get all blogposts route called");
    const BlogPostData = await Blogpost.findAll({
      include: [
        {
          model: User,
          //attributes: ['name'], //***integrate this back in when you get the blogpost model working***
        },
      ],
    });
    //console.log("BlogPostData: ", BlogPostData)

    // Serialize data so the template can read it
    const Blogposts = BlogPostData.map((Blogpost) => Blogpost.get({ plain: true }));

    // Pass serialized data and session flag into template
    console.log("rendering homepage");
    res.render('homepage', { 
      Blogposts,
      logged_in: req.session.logged_in  //*** don't need to login to view homepage anymore, but still need to pass logged in variable so buttons render correctly *** 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route if user is not logged in
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blogpost }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: req.session.logged_in  
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to home page
  if (req.session.logged_in) {
    console.error("login route called when user is already logged in");
    res.redirect('/');
    return;
  }

  if (req.session.logged_in === false) {
    res.render('login', {
      logged_in: req.session.logged_in //still need to pass logged in variable so buttons render correctly  
    });
    return;
  }

  else{
    console.log("no session detected, rendering login page");
    res.render('login', {
      logged_in: req.session.logged_in  
    });
    return;
  }
});

router.get('/logout', (req, res) => {
  if (!req.session.logged_in) {   // If the user is already logged in, redirect request to login page
    console.error("logout route called when user is not logged in");
    res.redirect('/login');
    return;
  }
  console.log("logging out user");
  req.session.destroy(() => {
    console.log("user logged out");
    res.status(204).end();
  });
  res.render('logout');
});

module.exports = router;
