"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emailValidator = exports.updateStudentValidator = exports.newStudentValidator = exports.loginValidator = exports.registerValidator = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const registerValidator = data => {
  const schema = _joi.default.object({
    name: _joi.default.string().min(8).required(),
    birthdate: _joi.default.string().required(),
    city: _joi.default.string().required(),
    email: _joi.default.string().email({
      minDomainSegments: 1,
      tlds: {
        allow: ["net"]
      }
    }).required(),
    password: _joi.default.string().pattern(new RegExp("^[a-zA-Z0-9]{8,20}$"))
  });

  return schema.validate(data);
};

exports.registerValidator = registerValidator;

const newStudentValidator = data => {
  const schema = _joi.default.object({
    name: _joi.default.string().min(8).required(),
    birthdate: _joi.default.string().required(),
    city: _joi.default.string().required(),
    email: _joi.default.string().email({
      minDomainSegments: 1,
      tlds: {
        allow: ["net"]
      }
    }).required()
  });

  return schema.validate(data);
};

exports.newStudentValidator = newStudentValidator;

const updateStudentValidator = data => {
  const schema = _joi.default.object({
    name: _joi.default.string().min(8).required(),
    birthdate: _joi.default.string().required(),
    city: _joi.default.string().required()
  });

  return schema.validate(data);
};

exports.updateStudentValidator = updateStudentValidator;

const loginValidator = data => {
  const schema = _joi.default.object({
    email: _joi.default.string().email({
      minDomainSegments: 1,
      tlds: {
        allow: ["net"]
      }
    }).required(),
    password: _joi.default.string().pattern(new RegExp("^[a-zA-Z0-9]{8,20}$"))
  });

  return schema.validate(data);
};

exports.loginValidator = loginValidator;

const emailValidator = data => {
  const schema = _joi.default.object({
    email: _joi.default.string().email({
      minDomainSegments: 1,
      tlds: {
        allow: ["net"]
      }
    }).required()
  });

  return schema.validate(data);
};

exports.emailValidator = emailValidator;