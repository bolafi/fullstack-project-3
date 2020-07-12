"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _hash = _interopRequireDefault(require("../helper/hash"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _auth = _interopRequireDefault(require("../helper/auth"));

var _Teacher = _interopRequireDefault(require("../models/Teacher"));

var _validation = require("../helper/validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

// . تسجيل مدرس جديد و تخزين بياناته | new teacher sign up
router.post("/register", async (req, res) => {
  const {
    name,
    birthdate,
    city,
    email,
    password
  } = req.body;
  const validation = (0, _validation.registerValidator)(req.body);
  if (validation.error) return res.status(401).send(validation.error.details[0].message);
  const existEmail = await _Teacher.default.findOne({
    email
  });
  if (existEmail) return res.status(401).send("".concat(email, " is already exists"));

  try {
    const teacher = new _Teacher.default({
      name,
      birthdate,
      city,
      email,
      password
    });
    await teacher.save();
    res.json(teacher);
  } catch (error) {
    res.json(error);
  }
}); //  تسجيل دخول مدرس و ارجاع التوكن | teacher login and response with jwt token

router.post("/login", async (req, res) => {
  const {
    email,
    password
  } = req.body;
  const validation = (0, _validation.loginValidator)(req.body);
  if (validation.error) return res.status(401).send(validation.error.details[0].message);

  try {
    const user = await _Teacher.default.findOne({
      email
    });
    if (!user) return res.status(401).send("User not found");
    if (user.password !== (0, _hash.default)(password, user.salt)) return res.status(401).send("the password and email does not match");

    const token = _jsonwebtoken.default.sign({
      sub: user._id
    }, process.env.SECRET, {
      expiresIn: 60 * 60 * 24
    });

    return res.status(200).json(token);
  } catch (error) {
    res.send(error);
  }
}); //--------------------------------GET ALL Teachers-------------------------------------//

router.get("/", _auth.default, async (req, res) => {
  try {
    const teachers = await _Teacher.default.find();
    res.status(200).send(teachers);
  } catch (error) {
    return res.status(500).json(error);
  }
}); // تصدير الوحدة | export the module

var _default = router;
exports.default = _default;