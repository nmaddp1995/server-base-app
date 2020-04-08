'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _envConfig = require('../config/envConfig');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = function auth(req, res, next) {
    var token = req.header('token');
    if (!token) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    try {
        var decoded = _jsonwebtoken2.default.verify(token, _envConfig.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.log('error here');
        console.error(err);
        res.status(500).send({
            message: 'Invalid token'
        });
    }
};

exports.default = auth;