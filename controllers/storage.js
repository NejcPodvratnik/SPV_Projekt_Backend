var StorageModel = require('../models/storage.js');
var RecipeModel = require('../models/recipe.js');

/**
 * storageController.js
 *
 * @description :: Server-side logic for managing storages.
 */
module.exports = {

    /**
     * storageController.list()
     */
    list: function (req, res) {
        StorageModel.find(function (err, storages) {
            if (err) 
                return res.status(500).json({ message: 'Error when getting storage.' });

            return res.json(storages);
        });
    },

    /**
     * storageController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        StorageModel.findOne({user_id: id}, function (err, storage) {
            if (err) 
                return res.status(500).json({ message: 'Error when getting storage' });
            if (!storage)
                return res.status(404).json({ message: 'No such storage' });
            return res.json(storage);
        });
    },

    /**
     * storageController.add()
     */
    add: function (req, res) {
        var id = req.params.id;
        var name = req.body.ingredient_name;
        var size_unit =  req.body.ingredient_size.substr(req.body.ingredient_size.indexOf(" ") + 1);;
        var size_value =  parseInt(req.body.ingredient_size.split(" ")[0]);

        StorageModel.findOne({user_id: id}, function (err, storage) {
            if (err) 
                return res.status(500).json({ message: 'Error when getting storage' });
            if (!storage)
                return res.status(404).json({ message: 'No such storage' });
            if(size_value === NaN || size_value <= 0)
                return res.status(400).json({ message: 'Size must be a positive number.' });


            if(storage.ingredients.get(name) === undefined)
                storage.ingredients.set(name,size_value + " " + size_unit);
            else
                storage.ingredients.set(name,(parseInt(storage.ingredients.get(name)) + size_value) + " " + size_unit);


            storage.save(function (err, storage) {
                if (err) 
                    return res.status(500).json({ message: 'Error when updating storage.' });
                return res.status(200).json(storage);
            });
        });
    },

    /**
     * storageController.reduce_manual()
     */
    reduce_manual: function (req, res) {
        var id = req.params.id;
        var name = req.body.ingredient_name;
        var size_unit =  req.body.ingredient_size.substr(req.body.ingredient_size.indexOf(" ") + 1);;
        var size_value =  parseInt(req.body.ingredient_size.split(" ")[0]);

        StorageModel.findOne({user_id: id}, function (err, storage) {
            if (err) 
                return res.status(500).json({ message: 'Error when getting storage' });
            if (!storage)
                return res.status(404).json({ message: 'No such storage' });
            if(size_value === NaN || size_value <= 0)
                return res.status(400).json({ message: 'Size must be a positive number.' });

            if(storage.ingredients.get(name) === undefined)
                storage.ingredients.set(name,size_value + " " + size_unit);
            else
            {
                new_value = parseInt(storage.ingredients.get(name)) - size_value;
                if(new_value < 0)
                    return res.status(400).json({message: 'Cannot reduce ' + size_value + size_unit + " of " + name});
                if(new_value === 0)
                    storage.ingredients.delete(name);
                else
                    storage.ingredients.set(name,new_value + " " + size_unit);
            }

            storage.save(function (err, storage) {
                if (err) 
                    return res.status(500).json({ message: 'Error when updating storage.' });
                return res.status(200).json(storage);
            });
        });
    },
    reduce_recipe: function (req, res) {
        var user_id = req.params.user_id;
        var recipe_id = req.params.recipe_id;

        StorageModel.findOne({user_id: user_id}, function (err, storage) {
            if (err) 
                return res.status(500).json({ message: 'Error when getting storage' });
            if (!storage)
                return res.status(404).json({ message: 'No such storage' });

            RecipeModel.findOne({_id: recipe_id}, function (err, recipe) {
                if (err) 
                    return res.status(500).json({ message: 'Error when getting recipe' });
                if (!recipe)
                    return res.status(404).json({ message: 'No such recipe' });
    
                for (let [key, value] of recipe.ingredients)
                {
                    if(storage.ingredients.get(key) === undefined)
                        return res.status(400).json({ message: 'Missing ingredient: ' + key });

                    ingredient_storage = parseInt(storage.ingredients.get(key).split(" ")[0])
                    ingredient_recipe = parseInt(value.split(" ")[0])
                    ingredient_unit =  value.substr(value.indexOf(" ") + 1);;

                    if(ingredient_storage < ingredient_recipe)
                        return res.status(400).json({ message: 'Not enough ' + key });
                    else if(ingredient_storage - ingredient_recipe === 0)
                        storage.ingredients.delete(key);
                    else
                        storage.ingredients.set(key,ingredient_storage - ingredient_recipe + " " + ingredient_unit);
                }

                storage.save(function (err, storage) {
                    if (err) 
                        return res.status(500).json({ message: 'Error when updating storage.' });
                    return res.status(200).json(storage);
                });
            });
        });
    }
};
