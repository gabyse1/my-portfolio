"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var isAuth = function isAuth(req, res, next) {
  var authorization = req.headers.authorization;
  if (authorization) {
    var token = authorization.slice(7, authorization.length);
    _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET || 'somethingsecret', function (err, decode) {
      if (err) res.status(401).send({
        message: {
          error: 'Invalid Token'
        }
      });else {
        res.user = decode;
        next();
      }
    });
  } else res.status(401).send({
    message: {
      error: 'No Token'
    }
  });
};
var _default = isAuth;
exports["default"] = _default;
//# sourceMappingURL=isAuth.js.map