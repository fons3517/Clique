const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect('/login');
  } else {
    session = req.session;
    session.userid = req.body.username;
    console.log(req.session);
    console.log(session.user_id);
    next();
  }
};

module.exports = withAuth;
