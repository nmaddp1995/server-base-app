'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _db = require('./config/db');

var _db2 = _interopRequireDefault(_db);

var _user = require('./routes/user');

var _user2 = _interopRequireDefault(_user);

var _envConfig = require('./config/envConfig');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _db2.default)();

var app = (0, _express2.default)();

// middleware
app.use(_bodyParser2.default.json());

app.get('/', function (req, res) {
    res.json({ message: 'API Working' });
});

app.use((0, _cors2.default)());

app.use('/user', _user2.default);

app.listen(_envConfig.PORT, function (req, res) {
    console.log('Server started ad PORT ' + _envConfig.PORT);
});