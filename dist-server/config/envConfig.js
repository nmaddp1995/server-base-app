'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PORT = exports.TOKEN_EXPIRED_TIME = exports.JWT_SECRET = undefined;

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var JWT_SECRET = exports.JWT_SECRET = process.env.JWT_SECRET;
var TOKEN_EXPIRED_TIME = exports.TOKEN_EXPIRED_TIME = process.env.TOKEN_EXPIRED_TIME;
var PORT = exports.PORT = process.env.PORT;

var envConfig = {
    JWT_SECRET: JWT_SECRET,
    TOKEN_EXPIRED_TIME: TOKEN_EXPIRED_TIME,
    PORT: PORT
};

exports.default = envConfig;