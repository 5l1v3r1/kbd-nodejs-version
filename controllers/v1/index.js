let express = require('express');
let router = express.Router();

let usersRouter = require('./user');
let authRouter = require('./auth');
let houseRouter = require('./house');

router.use('/', usersRouter);
router.use('/auth', authRouter);
router.use('/house', houseRouter);

module.exports = router;
