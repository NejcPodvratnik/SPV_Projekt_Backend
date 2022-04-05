var express = require('express');
var router = express.Router();
var storageController = require('../controllers/storage.js');

/*
 * GET
 */
router.get('/', storageController.list);


/*
 * GET
 */
router.get('/:id', storageController.show);

/*
 * PUT
 */
router.put('/add/:id', storageController.add);
router.put('/reduce_manual/:id', storageController.reduce_manual);


module.exports = router;
