"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/* eslint no-underscore-dangle: 0 */

var generateToken = function generateToken(user) {
  return _jsonwebtoken["default"].sign({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  }, process.env.JWT_SECRET || 'somethingsecret', {
    expiresIn: '30d'
  });
};
var _default = generateToken;
exports["default"] = _default;
//# sourceMappingURL=generateToken.js.map