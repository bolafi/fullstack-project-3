// في هذا الملف ، قم بإعداد وحدة المستخدم (الطالب) الخاصة بك | in this file, set up your user module


// 1. قم باستيراد مكتبة moongoose | import the mongoose library

import { Schema, model } from "mongoose";
import moment from "moment";

// 2. قم بتحديد مخطط الطالب | start defining your user schema

const StudentSchema = new Schema(
  {
    name: { type: String, required: true, min: 8 },
    birthdate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    city: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const StudentModel = model("Student", StudentSchema);

export default StudentModel;

// 3. إنشاء نموذج الطالب | create  the user model

// 4. تصدير الوحدة | export the module
