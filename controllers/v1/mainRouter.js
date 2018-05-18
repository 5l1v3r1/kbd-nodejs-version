let express = require('express');
let router = express.Router();

let indexRouter = require('./index');
let usersRouter = require('./users');

router.use('/', indexRouter);
router.use('/users', usersRouter);

module.exports = router;
