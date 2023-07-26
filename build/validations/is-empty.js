"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var isEmpty = function isEmpty(value) {
  return value === undefined || value === null || _typeof(value) === 'object' && Object.keys(value).length === 0 || _typeof(value) === 'object' && value.length === 0 || typeof value === 'string' && value.trim().length === 0;
};
var _default = isEmpty;
exports["default"] = _default;
//# sourceMappingURL=is-empty.js.map