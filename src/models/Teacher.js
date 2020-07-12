// في هذا الملف ، قم بإعداد وحدة المستخدم (المدرس) الخاصة بك | in this file, set up your user module
// 1. قم باستيراد مكتبة moongoose | import the mongoose library
import { Schema, model } from "mongoose";
import shortid from "shortid";
import hashPassword from "../helper/hash";

// 2. قم بتحديد مخطط المدرس | start defining your user schema
const TeacherSchema = new Schema(
  {
    name: { type: String, required: true, min: 8 },
    birthdate: { type: Date, default: Date.now, required: true },
    city: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 8, max: 20 },
    salt: { type: String },
  },
  {
    timestamps: true,
  }
);

// تخزين كلمة السر بعد عمل الهاش
TeacherSchema.pre("save", function (next) {
  if (!this.salt) {
    this.salt = shortid.generate();
  }

  if (this.password) {
    this.password = hashPassword(this.password, this.salt);
  }
  next();
});

// 3. إنشاء نموذج المدرس | create  the user model
const TeacherModel = model("Teacher", TeacherSchema);

// 4. تصدير الوحدة | export the module
export default TeacherModel;
