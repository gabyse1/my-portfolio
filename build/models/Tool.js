"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var toolSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  icon: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true,
  versionKey: false
});
var Tool = (0, _mongoose.model)('Tool', toolSchema);
var _default = Tool;
exports["default"] = _default;
//# sourceMappingURL=Tool.js.map