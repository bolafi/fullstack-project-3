import express from "express";
const router = express.Router();
import hashPassword from "../helper/hash";
import jwt from "jsonwebtoken";
import auth from "../helper/auth";

// . استيراد وحدةالمدرس | import the teacher module
import Teacher from "../models/Teacher";

// import validation methods
import { loginValidator, registerValidator } from "../helper/validation";

// . تسجيل مدرس جديد و تخزين بياناته | new teacher sign up

router.post("/register", async (req, res) => {
  const { name, birthdate, city, email, password } = req.body;

  const validation = registerValidator(req.body);
  if (validation.error)
    return res.status(401).send(validation.error.details[0].message);

  const existEmail = await Teacher.findOne({ email });
  if (existEmail) return res.status(401).send(`${email} is already exists`);

  try {
    const teacher = new Teacher({
      name,
      birthdate,
      city,
      email,
      password,
    });

    await teacher.save();
    res.json(teacher);
  } catch (error) {
    res.json(error);
  }
});

//  تسجيل دخول مدرس و ارجاع التوكن | teacher login and response with jwt token
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const validation = loginValidator(req.body);
  if (validation.error)
    return res.status(401).send(validation.error.details[0].message);

  try {
    const user = await Teacher.findOne({ email });
    if (!user) return res.status(401).send("User not found");

    if (user.password !== hashPassword(password, user.salt))
      return res.status(401).send("the password and email does not match");

    const token = jwt.sign({ sub: user._id }, process.env.SECRET, {
      expiresIn: 60 * 60 * 24,
    });
    return res.status(200).json(token);
  } catch (error) {
    res.send(error);
  }
});

//--------------------------------GET ALL Teachers-------------------------------------//

router.get("/", auth, async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).send(teachers);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// تصدير الوحدة | export the module
export default router;
