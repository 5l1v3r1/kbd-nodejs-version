let express = require('express');
let router = express.Router();

let indexRouter = require('./index');
let usersRouter = require('./users');
let authRouter = require('./auth');

router.use('/', indexRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);

module.exports = router;
