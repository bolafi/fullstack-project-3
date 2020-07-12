import jwt from "jsonwebtoken";
import Teacher from "../models/Teacher";

const auth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("Please Login");
  } else {
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      const user = await Teacher.findById(decodedToken.sub);
      if (!user) {
        return res.status(401).send("You Don't Have Permission");
      } else {
        next();
      }
    } catch (error) {
      return res.status(401).json(error);
    }
  }
};

export default auth;
