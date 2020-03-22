let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

let user = require('../models/user-schema');
let messages = require('../models/message-schema');

router.route('/create').post((req, res, next) => {
    user.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    });
});

router.route('/createMessage').post((req, res, next) => {
    messages.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    });
});

router.route('/login').get((req, res) => {
    var loginStatus = {};
    user.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            if(data) {
                data.forEach(item => {
                    console.log(item.email, req.query.email);
                    if(item.email === req.query.email) {
                        loginStatus = item;
                    }
                });
            }
        }
        res.json(loginStatus);
    });
});

router.route('/getUsers').get((req, res) => {
    user.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    });
});

router.route('/getMessage').get((req, res) => {
    messages.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    });
});

router.route('/edit/:id').get((req, res) => {
    user.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    });
});


router.route('/update/:id').put((req, res, next) => {
    user.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('User updated successfully !')
        }
    });
});

router.route('/delete/:id').delete((req, res, next) => {
    user.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    });
});

module.exports = router;