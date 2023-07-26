"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _validator = _interopRequireDefault(require("validator"));
var _isEmpty = _interopRequireDefault(require("./is-empty"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var validateSigninInput = function validateSigninInput(data) {
  var errors = {};
  data.email = !(0, _isEmpty["default"])(data.email) ? data.email : '';
  data.password = !(0, _isEmpty["default"])(data.password) ? data.password : '';
  if (!_validator["default"].isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (_validator["default"].isEmpty(data.email)) {
    errors.email = 'Email is required';
  }
  if (_validator["default"].isEmpty(data.password)) {
    errors.password = 'Password is required';
  }
  return {
    errors: errors,
    isValid: (0, _isEmpty["default"])(errors)
  };
};
var _default = validateSigninInput;
exports["default"] = _default;
//# sourceMappingURL=signin.js.map