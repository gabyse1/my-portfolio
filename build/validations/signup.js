"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _validator = _interopRequireDefault(require("validator"));
var _isEmpty = _interopRequireDefault(require("./is-empty"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var validateSignupInput = function validateSignupInput(data) {
  var errors = {};
  data.name = !(0, _isEmpty["default"])(data.name) ? data.name : '';
  data.email = !(0, _isEmpty["default"])(data.email) ? data.email : '';
  data.password = !(0, _isEmpty["default"])(data.password) ? data.password : '';
  if (!_validator["default"].isLength(data.name, {
    min: 2,
    max: 50
  })) {
    errors.name = 'Name must be between 2 to 50 chars';
  }
  if (_validator["default"].isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  if (!_validator["default"].isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (_validator["default"].isEmpty(data.email)) {
    errors.email = 'Email is required';
  }
  if (!_validator["default"].isLength(data.password, {
    min: 8,
    max: 40
  })) {
    errors.password = 'Password must be between 8 to 40 chars';
  }
  if (_validator["default"].isEmpty(data.password)) {
    errors.password = 'Password is required';
  }
  return {
    errors: errors,
    isValid: (0, _isEmpty["default"])(errors)
  };
};
var _default = validateSignupInput;
exports["default"] = _default;
//# sourceMappingURL=signup.js.map