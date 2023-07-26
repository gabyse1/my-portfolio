"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));
var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cors = _interopRequireDefault(require("cors"));
var _path = _interopRequireDefault(require("path"));
require("./database");
var _secureurl = _interopRequireDefault(require("./routes/secureurl.router"));
var _user = _interopRequireDefault(require("./routes/user.router"));
var _tool = _interopRequireDefault(require("./routes/tool.router"));
var _project = _interopRequireDefault(require("./routes/project.router"));
var _mail = _interopRequireDefault(require("./routes/mail.router"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// set environment
if (process.env.NODE_ENV !== 'production') _dotenv["default"].config();

// initialization
var app = (0, _express["default"])();

// settings
app.set('port', process.env.PORT || 5000);

// middlewares
app.use((0, _morgan["default"])('tiny'));
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json());
app.use((0, _cors["default"])({
  origin: "http://localhost:".concat(process.env.PORT || 3000)
}));

// Serve static files from the React app
app.use(_express["default"]["static"](_path["default"].join(__dirname, '../client/build')));

// routes
app.use('/api/s3', _secureurl["default"]);
app.use('/api/tools', _tool["default"]);
app.use('/api/projects', _project["default"]);
app.use('/api/users', _user["default"]);
app.use('/api/mail', _mail["default"]);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', function (req, res) {
  res.sendFile(_path["default"].join(__dirname, '../client/build/index.html'));
});

// error handler
app.use(function (error, req, res) {
  var code = error.code,
    keyValue = error.keyValue;
  if (code === 11000) {
    var customError = new Error("This ".concat(Object.keys(keyValue)[0], " is already in use"));
    return res.status(409).send({
      message: customError.message
    });
  }
  return res.status(500).send({
    message: error.message
  });
});

// start server
app.listen(app.get('port'), function () {
  console.log("Server listening on port ".concat(app.get('port')));
});
//# sourceMappingURL=index.js.map