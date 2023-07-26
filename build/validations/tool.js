"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _validator = _interopRequireDefault(require("validator"));
var _isEmpty = _interopRequireDefault(require("./is-empty"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var validateToolInput = function validateToolInput(data) {
  var errors = {};
  data.name = !(0, _isEmpty["default"])(data.name) ? data.name : '';
  data.icon = !(0, _isEmpty["default"])(data.icon) ? data.icon : '';
  if (!_validator["default"].isLength(data.name, {
    min: 2,
    max: 50
  })) {
    errors.name = 'Name must be between 2 to 50 chars';
  }
  if (_validator["default"].isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  if (_validator["default"].isEmpty(data.icon)) {
    errors.icon = 'Icon is required';
  }
  return {
    errors: errors,
    isValid: (0, _isEmpty["default"])(errors)
  };
};
var _default = validateToolInput;
exports["default"] = _default;
//# sourceMappingURL=tool.js.map