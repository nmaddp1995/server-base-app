'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MONGOURI = 'mongodb+srv://nmaddp1995:nmaddp1995@old-book-lar9s.mongodb.net/old-book-db';

var InitiateMongoServer = async function InitiateMongoServer() {
    try {
        await _mongoose2.default.connect(MONGOURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to DB !!');
    } catch (e) {
        console.log(e);
        throw e;
    }
};

exports.default = InitiateMongoServer;