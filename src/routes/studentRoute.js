// في هذا الملف ، قم بإعداد طرق التطبيق الخاصة بك | in this file, set up your application routes

import express from "express";
const router = express.Router();

import auth from "../helper/auth";

// 2. استيراد وحدة الطالب | import the student module
import Student from "../models/Student";

// import validation methods
import {
  newStudentValidator,
  updateStudentValidator,
  emailValidator,
} from "../helper/validation";

// 5. إعداد طرق مختلفة | setup the different routes (get, post, put, delete)

// ------------create new student && Email (only .net)--------------------------//
router.post("/new", auth, async (req, res) => {
  const { name, birthdate, city, email } = req.body;

  const validation = newStudentValidator(req.body);
  if (validation.error)
    return res.status(401).send(validation.error.details[0].message);

  const existEmail = await Student.findOne({ email });
  if (existEmail) return res.status(401).send(`${email} is already exists`);

  try {
    const student = new Student({
      name,
      birthdate,
      city,
      email,
    });

    await student.save();
    res.status(200).send(student);
  } catch (error) {
    res.send(error);
  }
});

// -------------Update student && Email (only .net)--------------------------//
router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { name, birthdate, city } = req.body;
  const validation = updateStudentValidator(req.body);
  if (validation.error)
    return res.status(401).send(validation.error.details[0].message);

  const student = await Student.findById(id);
  if (!student) return res.status(401).send("Student does not exist");

  try {
    student.name = name || student.name;
    student.birthdate = birthdate || student.birthdate;
    student.city = city || student.city;

    await student.save();
    res.status(200).send(student);
  } catch (error) {
    res.send(error);
  }
});

//--------------------------------Delete User -------------------------------------//
router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (id) {
    try {
      const deleteUser = await Student.findByIdAndDelete({ _id: id });
      res.status(204).send(`${deleteUser.name} data has been removed`);
    } catch (err) {
      res.send(err);
    }
  }
});

// ------------------------GET User By Email (only .net) --------------------------------------------//

router.get("/:email", auth, async (req, res) => {
  const { email } = req.params;

  const validation = emailValidator(req.params);
  if (validation.error)
    return res.status(401).send(validation.error.details[0].message);

  if (email) {
    try {
      const student = await Student.findOne({ email });
      if (!student) return res.status(400).send("Student not exist");

      res.status(200).send(student);
    } catch (error) {
      res.send(error);
    }
  }
});

//--------------------------------GET ALL STUDENTS-------------------------------------//
router.get("/", auth, async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).send(students);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// 3. تصدير الوحدة | export the module
export default router;
