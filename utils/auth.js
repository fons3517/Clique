const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect('/login');
  } else {
    session = req.session;
    session.userid = req.body.username;
    console.log(req.session);
    next();
  }
};

module.exports = withAuth;
