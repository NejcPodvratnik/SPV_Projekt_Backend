var UserModel = require('../models/user.js');
var StorageModel = require('../models/storage.js');

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: function (req, res) {
        UserModel.find(function (err, users) {
            if (err) 
                return res.status(500).json({ message: 'Error when getting user.' });
            return res.json(users);
        });
    },

    /**
     * userController.create()
     */
    create: function (req, res) {
        var user = new UserModel({
			username : req.body.username,
			email : req.body.email,
			password : req.body.password,
        });

        UserModel.findOne({username: req.body.username}, function (err, user1) {
            if (err)
                return res.status(500).json({ message: 'Error when getting user.' });

            if (!user1) {
                user.save(function (err, user) {
                    if (err) 
                        return res.status(500).json({ message: 'Error when creating user' });

                    var storage = new StorageModel({
                        user_id : user._id,
                        ingredients : new Map()
                    });

                    storage.save(function (err, storage) {
                        if (err)
                            return res.status(500).json({ message: 'Error when creating user storage' });
                    });
                    return res.status(201).json(user);
                });
            }
            else
                return res.status(500).json({ message: 'User already exists.' });
        });
    },

    /**
     * userController.login()
     */
    login: function(req,res,next)
    {
        UserModel.authenticate(req.body.username,req.body.password,function(error,user){
            if(error || !user)
            {
                return res.status(400).json({
                    message: 'Wrong username or password'
                });
            }
            else
            {
                req.session.userId = user._id;
                req.session.username = user.username;
                return res.status(200).json(user);
            }
        });
    },
    
    /**
     * userController.logout()
     */
    logout: function(req,res,next)
    {
        if(req.session)
        {
            req.session.destroy(function (err) {
                if(err)
                    return next(err);
                else
                    return res.status(200).json({
                        message: 'Logged out.'
                    });
            })
        }
    }
};
