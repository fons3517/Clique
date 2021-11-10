const router = require('express').Router();
const { Group, Post, User } = require('../models');
const withAuth = require('../utils/auth');

// get a group
router.get('/id/:id', withAuth, (req, res) => {
  Group.findByPk(req.params.id, {
    attributes: ['id', 'name', 'description'],
    include: {
      model: Post,
      attributes: ['id', 'title', 'post_text', 'user_id', 'created_at'],
      include: {
        model: User,
        attributes: ['id', 'username'],
      }
    }
  })
    .then((dbGroupData) => {
      //serialize the data before passing to the template
      const group = dbGroupData.get({ plain: true });
      res.render('group', { group, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  req.session.save(() => {
    req.session.current_group_id = req.params.id;
  });
});

router.get('/new', (req, res) => {
  res.render('create-group', {
    loggedIn: true,
  });
});

router.post('/', withAuth, (req, res) => {
  Group.create({
    name: req.body.name,
    description: req.body.desc,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/new-post', (req, res) => {
  res.render('add-post', {
    loggedIn: true,
  });
});

module.exports = router;
