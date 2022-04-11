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
router.put('/reduce_recipe/:user_id/:recipe_id', storageController.reduce_recipe);


module.exports = router;
