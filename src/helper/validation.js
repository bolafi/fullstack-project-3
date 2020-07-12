import Joi from "@hapi/joi";

const registerValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(8).required(),
    birthdate: Joi.string().required(),
    city: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 1, tlds: { allow: ["net"] } })
      .required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,20}$")),
  });

  return schema.validate(data);
};

const newStudentValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(8).required(),
    birthdate: Joi.string().required(),
    city: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 1, tlds: { allow: ["net"] } })
      .required(),
  });

  return schema.validate(data);
};

const updateStudentValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(8).required(),
    birthdate: Joi.string().required(),
    city: Joi.string().required(),
  });

  return schema.validate(data);
};

const loginValidator = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 1, tlds: { allow: ["net"] } })
      .required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,20}$")),
  });

  return schema.validate(data);
};

const emailValidator = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 1, tlds: { allow: ["net"] } })
      .required(),
  });

  return schema.validate(data);
};

export {
  registerValidator,
  loginValidator,
  newStudentValidator,
  updateStudentValidator,
  emailValidator,
};
