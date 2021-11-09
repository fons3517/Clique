const router = require('express').Router();
const { Group, User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get all posts
router.get('/:id', withAuth, (req, res) => {
  Group.findbyPk(req.params.id, {
    attributes: ['id', 'name', 'description', 'owner_id'],
    include: [
      {
        model: Post,
        attributes: ['title', 'post_text', 'user_id', 'created_at'],
        include: {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'post_id',
            'user_id',
            'created_at',
          ],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      },
      {
        model: User,
        attributes: ['id', 'username'],
      },
    ],
  })
    .then((dbGroupData) => {
      //serialize the data before passing to the template
      const group = dbGroupData.get({ plain: true });
      console.log(group);
      res.render('group', { group, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get a single post
router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title', 'post_text', 'created_at'],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      //serialize the data
      const post = dbPostData.get({ plain: true });
      // pass to the template
      res.render('edit-post', {
        post,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/group', (req, res) => {
  res.render('group', {
    loggedIn: true,
  });
});

/* router.post('/', withAuth, (req, res) => {
  Group.create({
    name: req.body.name,
    description: req.body.description,
    id: req.session.id,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log('nope');
      res.status(500).json(err);
    });
}); */

module.exports = router;
