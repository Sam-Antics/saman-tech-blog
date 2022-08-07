const router = require('express').Router();
const { User } = require('../../models');

// GET api/users
router.get('/', (req, res) => {
  User.findAll()
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// GET api/users/1
router.get('/:id',(req, res) => {
  User.findOne({
    // exclude password data from requests
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Create a user (api/users)
router.post('/', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

// login POST route (carries the request parameter in req.body, which makes it more secure)
router.post('/login', (req, res) => {
    // expects {email: 'fakest@email.com', password: 'password1234'}
      User.findOne({
        where: {
          email: req.body.email
        }
      }).then(dbUserData => {
        if (!dbUserData) {
          res.status(400).json({ message: 'No user with that email address!' });
          return;
        }
    
        // Verify user
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
          res.status(400).json({ message: 'Incorrect password. '});
          return;
        }
        
        res.json({ user: dbUserData, message: 'You are now logged in.' });
      });  
    });

// UPDATE existing user (api/users/1)
router.put('/:id', (req, res) => {
  // if req.body has exact key/value pairs to match the model, you can just use 'req.body' instead
  User.update(req.body, {
    individualHooks: true,
    where: {
    id: req.params.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData[0]) {
      res.status(404).json({ message: 'No user found with this ID.' });
      return;
    }
    res.json(dbUserData);
    })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
   });
});

// DELETE existing user (api/users/1)
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
        id: req.params.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this ID '});
      return;
    }
    res.json(dbUserData);
    })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


// export the routes
module.exports = router;