var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.js');

/*
 * GET
 */
router.get('/', userController.list);
router.get('/logout',userController.logout);


/*
 * POST
 */
router.post('/', userController.create);
router.post('/login', userController.login);

module.exports = router;
