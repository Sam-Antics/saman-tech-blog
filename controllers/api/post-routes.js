const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// sequelize is required for "sequelize.literal" in the vote counts
// const sequelize = require("../../config/connection");

// get all users
router.get('/', (req, res) => {
    console.log('========================')
    Post.findAll({
      order: [['created_at', 'DESC']],
      attributes: [
        'id', 
        'post_title', 
        'post_content', 
        'created_at',
      ],
      include: [
        // include the Comment model here:
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'post_id',
            'user_id',
            'created_at'
          ],
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

// GET a single blog post
router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      order: [['created_at', 'DESC']],
      attributes: [
        'id', 
        'post_title', 
        'post_content', 
        'created_at',
      ],
      include: [
        // include the comment model:
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'post_id',
            'user_id',
            'created_at'
          ],
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id.'});
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

  // CREATE a blog post
router.post('/', (req, res) => {
    // expects {post_title: 'First Post!', post_content: 'blabity-blah post content ...', user_id: 1}
    Post.create({
      post_title: req.body.post_title,
      post_content: req.body.post_content,
      user_id: req.body.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

// UPDATE a blog post's title
router.put('/:id', (req, res) => {
    Post.update(
      {
        post_title: req.body.post_title,
        post_content: req.body.post_content
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id.' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });



module.exports = router;