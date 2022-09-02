const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');
const bookingsRouter = require('./bookings.js');

// GET /api/set-token-cookie
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');

// GET /api/restore-user
const { restoreUser } = require('../../utils/auth.js');

// GET /api/require-auth
const { requireAuth } = require('../../utils/auth.js');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/reviews', reviewsRouter);

router.use('/bookings', bookingsRouter)


// Test
router.get('/test', requireAuth, (req, res) => {
  res.json({
    message: 'success'
  })
})



// Test
router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
  });








module.exports = router;