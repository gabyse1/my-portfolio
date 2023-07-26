"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var userSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    "default": false,
    required: true
  },
  status: {
    type: String,
    "enum": ['Pending', 'Active'],
    "default": 'Pending'
  },
  confirmationCode: {
    type: String,
    unique: true
  }
}, {
  timestamps: true,
  versionKey: false
});
var User = (0, _mongoose.model)('User', userSchema);
var _default = User;
exports["default"] = _default;
//# sourceMappingURL=User.js.map