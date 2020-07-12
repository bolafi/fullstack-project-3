"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _shortid = _interopRequireDefault(require("shortid"));

var _hash = _interopRequireDefault(require("../helper/hash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// في هذا الملف ، قم بإعداد وحدة المستخدم (المدرس) الخاصة بك | in this file, set up your user module
// 1. قم باستيراد مكتبة moongoose | import the mongoose library
// 2. قم بتحديد مخطط المدرس | start defining your user schema
const TeacherSchema = new _mongoose.Schema({
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
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 20
  },
  salt: {
    type: String
  }
}, {
  timestamps: true
}); // تخزين كلمة السر بعد عمل الهاش

TeacherSchema.pre("save", function (next) {
  if (!this.salt) {
    this.salt = _shortid.default.generate();
  }

  if (this.password) {
    this.password = (0, _hash.default)(this.password, this.salt);
  }

  next();
}); // 3. إنشاء نموذج المدرس | create  the user model

const TeacherModel = (0, _mongoose.model)("Teacher", TeacherSchema); // 4. تصدير الوحدة | export the module

var _default = TeacherModel;
exports.default = _default;