"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _Teacher = _interopRequireDefault(require("../models/Teacher"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const auth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("Please Login");
  } else {
    try {
      const decodedToken = _jsonwebtoken.default.verify(token, process.env.SECRET);

      const user = await _Teacher.default.findById(decodedToken.sub);

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

var _default = auth;
exports.default = _default;