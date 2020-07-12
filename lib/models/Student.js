"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// في هذا الملف ، قم بإعداد وحدة المستخدم (الطالب) الخاصة بك | in this file, set up your user module
// 1. قم باستيراد مكتبة moongoose | import the mongoose library
// 2. قم بتحديد مخطط الطالب | start defining your user schema
const StudentSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 8
  },
  birthdate: {
    type: Date,
    default: Date.now,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});
const StudentModel = (0, _mongoose.model)("Student", StudentSchema);
var _default = StudentModel; // 3. إنشاء نموذج الطالب | create  the user model
// 4. تصدير الوحدة | export the module

exports.default = _default;