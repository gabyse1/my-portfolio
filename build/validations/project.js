"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _validator = _interopRequireDefault(require("validator"));
var _isEmpty = _interopRequireDefault(require("./is-empty"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var validateProjectInput = function validateProjectInput(data) {
  var errors = {};
  data.title = !(0, _isEmpty["default"])(data.title) ? data.title : '';
  data.category = !(0, _isEmpty["default"])(data.category) ? data.category : '';
  data.concept = !(0, _isEmpty["default"])(data.concept) ? data.concept : '';
  data.tools = !(0, _isEmpty["default"])(data.tools) ? data.tools : [];
  data.fonts = !(0, _isEmpty["default"])(data.fonts) ? data.fonts : [];
  data.colors = !(0, _isEmpty["default"])(data.colors) ? data.colors : [];
  data.main_image = !(0, _isEmpty["default"])(data.main_image) ? data.main_image : '';
  data.concept_image = !(0, _isEmpty["default"])(data.concept_image) ? data.concept_image : '';
  data.live_url = !(0, _isEmpty["default"])(data.live_url) ? data.live_url : '';
  data.source_url = !(0, _isEmpty["default"])(data.source_url) ? data.source_url : '';
  if (!_validator["default"].isLength(data.title, {
    min: 2,
    max: 50
  })) {
    errors.title = 'Title must be between 2 to 50 chars';
  }
  if (_validator["default"].isEmpty(data.title)) {
    errors.name = 'Title field is required';
  }
  if (_validator["default"].isEmpty(data.category)) {
    errors.type = 'Type is required';
  }
  if (_validator["default"].isEmpty(data.concept)) {
    errors.concept = 'Concept is required';
  }
  if (data.tools.length === 0) {
    errors.tools = 'Enter almost one tool';
  }
  if (data.fonts.length === 0) {
    errors.fonts = 'Enter almost one font';
  }
  if (data.colors.length === 0) {
    errors.colors = 'Enter almost one color';
  }
  if (_validator["default"].isEmpty(data.main_image)) {
    errors.main_image = 'Main image is required';
  }
  if (_validator["default"].isEmpty(data.concept_image)) {
    errors.concept_image = 'Concept image is required';
  }
  if (_validator["default"].isEmpty(data.live_url)) {
    errors.live_url = 'Live url is required';
  }
  if (_validator["default"].isEmpty(data.source_url)) {
    errors.source_url = 'Source url is required';
  }
  return {
    errors: errors,
    isValid: (0, _isEmpty["default"])(errors)
  };
};
var _default = validateProjectInput;
exports["default"] = _default;
//# sourceMappingURL=project.js.map