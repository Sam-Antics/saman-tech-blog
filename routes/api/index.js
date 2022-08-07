const router = require('express').Router();

// gather routes
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');

// set up the endpoints
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;