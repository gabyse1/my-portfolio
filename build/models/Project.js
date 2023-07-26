"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var projectSchema = new _mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  concept: {
    type: String,
    required: true,
    trim: true
  },
  tools: {
    type: Array,
    required: true
  },
  fonts: {
    type: Array,
    required: true
  },
  colors: {
    type: Array,
    required: true
  },
  main_image: {
    type: String,
    required: true
  },
  concept_image: {
    type: String,
    required: true
  },
  live_url: {
    type: String,
    required: true
  },
  source_url: {
    type: String,
    required: true
  },
  highlighted: {
    type: Boolean,
    "default": true
  }
}, {
  timestamps: true,
  versionKey: false
});
var Project = (0, _mongoose.model)('Project', projectSchema);
var _default = Project;
exports["default"] = _default;
//# sourceMappingURL=Project.js.map