const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  console.log("withAuth middleware called");
  if (!req.session.logged_in) {
    res.status(400).redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
