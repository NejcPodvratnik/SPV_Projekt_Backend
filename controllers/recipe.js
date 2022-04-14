var RecipeModel = require('../models/recipe.js');
var StorageModel = require('../models/storage.js');

/**
 * recipeController.js
 *
 * @description :: Server-side logic for managing recipes.
 */
module.exports = {

    /**
     * recipeController.list()
     */
    list: function (req, res) {
        RecipeModel.find(function (err, recipes) {
            if (err) 
                return res.status(500).json({ message: 'Error when getting recipes.' });
            return res.json(recipes);
        });
    },

    /**
     * recipeController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        RecipeModel.findOne({_id: id}, function (err, recipe) {
            if (err) 
                return res.status(500).json({ message: 'Error when getting recipe' });
            if (!recipe)
                return res.status(404).json({ message: 'No such recipe' });
            return res.json(recipe);
        });
    },

    filter_by_storage: function (req, res) {
        var id = req.params.id;
        StorageModel.findOne({user_id: id}, function (err, storage) {
            if (err) 
                return res.status(500).json({ message: 'Error when getting storage' });
            if (!storage)
                return res.status(404).json({ message: 'No such storage' });

            //for (let [key, value] of storage.ingredients)
            //        console.log(key + " = " + value);
            
            RecipeModel.find(function (err, recipes) {
                if (err) 
                    return res.status(500).json({ message: 'Error when getting recipes.' });

                for (var i = 0; i < recipes.length; i++)
                {
                    for (let [key, value] of recipes[i].ingredients)
                    {
                        if(storage.ingredients.get(key) === undefined)
                        {
                            recipes.splice(i--,1);
                            break;
                        }

                        ingredient_storage = parseInt(storage.ingredients.get(key).split(" ")[0])
                        ingredient_recipe = parseInt(value.split(" ")[0])
                            
                        if(ingredient_storage < ingredient_recipe)
                        {
                            recipes.splice(i--,1);
                            break;
                        }
                    }
                }
                return res.json(recipes);
            });
        });
    },

    /**
     * recipeController.create()
     */
     create: function (req, res) {
        var recipe = new RecipeModel({
			name : req.body.name,
            instructions : req.body.instructions,
            ingredients : new Map(Object.entries(req.body.ingredients)),
            preparation : req.body.preparation,
            image_path : 'images/' + req.file.filename
        });

        recipe.save(function (err, recipe) {
            if (err)
                return res.status(500).json({ message: 'Error when creating recipe' });
            return res.status(201).json(recipe);
        });
        
    },

};
