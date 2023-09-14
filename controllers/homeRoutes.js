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
      //logged_in: req.session.logged_in  //*** don't need to login to view homepage anymore *** 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/CrossSet/:id', withAuth, async (req, res) => {
  try {
    const CrossSetData = await  CrossSet.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const SerialCrossSet = CrossSetData.get({ plain: true });

    res.render('CrossSet', {
      ...SerialCrossSet,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: CrossSet }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
