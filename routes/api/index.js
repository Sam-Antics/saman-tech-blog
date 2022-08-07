const router = require('express').Router();

// gather routes
const userRoutes = require('./user-routes.js');

// set up the endpoints
router.use('/users', userRoutes);

module.exports = router;