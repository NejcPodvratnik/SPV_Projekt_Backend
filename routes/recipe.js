var express = require('express');
var router = express.Router();
var recipeController = require('../controllers/recipe.js');
var multer = require('multer');
var upload = multer({dest:'public/images/'});

/*
 * GET
 */
router.get('/', recipeController.list);
router.get('/filter_by_storage/:id', recipeController.filter_by_storage);


/*
 * GET
 */
router.get('/:id', recipeController.show);

/*
 * POST
 */
router.post('/', upload.single('image') ,recipeController.create);

module.exports = router;
