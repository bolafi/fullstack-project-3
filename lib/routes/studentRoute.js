"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("../helper/auth"));

var _Student = _interopRequireDefault(require("../models/Student"));

var _validation = require("../helper/validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// في هذا الملف ، قم بإعداد طرق التطبيق الخاصة بك | in this file, set up your application routes
const router = _express.default.Router();

// 5. إعداد طرق مختلفة | setup the different routes (get, post, put, delete)
// ------------create new student && Email (only .net)--------------------------//
router.post("/new", _auth.default, async (req, res) => {
  const {
    name,
    birthdate,
    city,
    email
  } = req.body;
  const validation = (0, _validation.newStudentValidator)(req.body);
  if (validation.error) return res.status(401).send(validation.error.details[0].message);
  const existEmail = await _Student.default.findOne({
    email
  });
  if (existEmail) return res.status(401).send("".concat(email, " is already exists"));

  try {
    const student = new _Student.default({
      name,
      birthdate,
      city,
      email
    });
    await student.save();
    res.status(200).send(student);
  } catch (error) {
    res.send(error);
  }
}); // -------------Update student && Email (only .net)--------------------------//

router.put("/:id", _auth.default, async (req, res) => {
  const {
    id
  } = req.params;
  const {
    name,
    birthdate,
    city
  } = req.body;
  const validation = (0, _validation.updateStudentValidator)(req.body);
  if (validation.error) return res.status(401).send(validation.error.details[0].message);
  const student = await _Student.default.findById(id);
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
}); //--------------------------------Delete User -------------------------------------//

router.delete("/:id", _auth.default, async (req, res) => {
  const {
    id
  } = req.params;

  if (id) {
    try {
      const deleteUser = await _Student.default.findByIdAndDelete({
        _id: id
      });
      res.status(204).send("".concat(deleteUser.name, " data has been removed"));
    } catch (err) {
      res.send(err);
    }
  }
}); // ------------------------GET User By Email (only .net) --------------------------------------------//

router.get("/:email", _auth.default, async (req, res) => {
  const {
    email
  } = req.params;
  const validation = (0, _validation.emailValidator)(req.params);
  if (validation.error) return res.status(401).send(validation.error.details[0].message);

  if (email) {
    try {
      const student = await _Student.default.findOne({
        email
      });
      if (!student) return res.status(400).send("Student not exist");
      res.status(200).send(student);
    } catch (error) {
      res.send(error);
    }
  }
}); //--------------------------------GET ALL STUDENTS-------------------------------------//

router.get("/", _auth.default, async (req, res) => {
  try {
    const students = await _Student.default.find();
    res.status(200).send(students);
  } catch (error) {
    return res.status(500).json(error);
  }
}); // 3. تصدير الوحدة | export the module

var _default = router;
exports.default = _default;