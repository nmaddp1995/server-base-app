'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _expressValidator = require('express-validator');

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _UserModel = require('../model/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

var _envConfig = require('../config/envConfig');

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.post('/signup', [(0, _expressValidator.check)('username', 'Please enter a valid username').not().isEmpty(), (0, _expressValidator.check)('email', 'Please enter a valid email').isEmail(), (0, _expressValidator.check)('password', 'Please enter a valid password').isLength({
    min: 6
})], async function (req, res) {
    var errors = (0, _expressValidator.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    var _req$body = req.body,
        username = _req$body.username,
        email = _req$body.email,
        password = _req$body.password;

    try {
        var userInDB = await _UserModel2.default.findOne({
            username: username
        });
        if (userInDB) {
            return res.status(400).json({
                msg: "User already exists"
            });
        }

        var newUser = new _UserModel2.default({
            username: username,
            email: email,
            password: password
        });

        var salt = await _bcryptjs2.default.genSalt(10);
        newUser.password = await _bcryptjs2.default.hash(password, salt);

        await newUser.save();
        var payload = {
            user: {
                id: newUser.id
            }
        };
        _jsonwebtoken2.default.sign(payload, _envConfig.JWT_SECRET, {
            expiresIn: _envConfig.TOKEN_EXPIRED_TIME
        }, function (err, token) {
            if (err) throw err;
            res.status(200).json({
                token: token
            });
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Error when saving');
    }
});

router.post('/login', [(0, _expressValidator.check)('username', 'Please enter a valid username').not().isEmpty(), (0, _expressValidator.check)('password', 'Please enter a valid password').isLength({
    min: 6
})], async function (req, res) {
    var errors = (0, _expressValidator.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    var _req$body2 = req.body,
        username = _req$body2.username,
        password = _req$body2.password;

    try {
        var userInDB = await _UserModel2.default.findOne({
            username: username
        });
        console.log('userInDB', userInDB);
        if (!userInDB) {
            return res.status(400).json({
                message: 'User or password is incorrect'
            });
        }
        var isMatchPass = await _bcryptjs2.default.compare(password, userInDB.password);
        if (!isMatchPass) {
            return res.status(400).json({
                message: 'User or password is incorrect'
            });
        }
        var payload = {
            user: {
                id: userInDB.id
            }
        };

        _jsonwebtoken2.default.sign(payload, _envConfig.JWT_SECRET, {
            expiresIn: _envConfig.TOKEN_EXPIRED_TIME
        }, function (err, token) {
            if (err) throw err;
            res.status(200).json({
                token: token
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error when login"
        });
    }
});

router.get('/me', _auth2.default, async function (req, res) {
    try {
        var user = await _UserModel2.default.findById(req.user.id);
        res.status(200).json({
            username: user.username,
            email: user.email
        });
    } catch (err) {
        res.send({ message: "Error when fetching user" });
    }
});

exports.default = router;