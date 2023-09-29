const router = require('express').Router();
const {User, Blogpost, Comment} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    console.log("homepage route called");
    /*const blogpostData = await BlogPost.findAll({
      include: [{
        model: User,
        as: 'commenter_name',
      }, {
        model: Comment,
        as: 'Comments',
      }],
      order: [['date_created', 'DESC']] // Order by creation date in descending order
    }); */
    const blogpostData = await Blogpost.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
            },
          ],
        },
      ],
    });
  

    //console.log("BlogPostData: ", BlogPostData)

    // Serialize data so the template can read it
    const Blogposts = blogpostData.map((BlogPost) => BlogPost.get({ plain: true }));
    //console.log(Blogposts[0].user);
    console.log(Blogposts[0].comments);
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
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    //console.log("dashboard route called");
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blogpost }],
    });

    const user = userData.get({ plain: true });
    console.log("user: ");
    console.log(user);
    //console.log("rendering dashboard");
    res.status(200).render('dashboard', {
      ...user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log("error rendering dashboard");
    console.log(err);
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
  if (req.session.logged_in === false) {   // If the user is already logged in, redirect request to login page
    console.error("logout route called when user is not logged in");
    res.redirect('/login');
    return;
  }
  console.log("logging out user");
  req.session.destroy(() => {
    console.log("user logged out");
    console.log("rendering logout page");
    res.status(200).render('logout', {logged_in: false});
  });
  return;
});

module.exports = router;
