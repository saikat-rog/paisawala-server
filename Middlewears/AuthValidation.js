const Joi = require("joi");

const signUpValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required()
      .messages({
        "string.pattern.base": "Phone number must be a 10-digit number.",
        "string.empty": "Phone number cannot be empty.",
      }),
    password: Joi.string().min(8).required().messages({
      "string.min": "Password must be 8 char long",
      "string.empty": "Password cannot be empty.",
    }),
    referCode: Joi.string().min(6).required().messages({
      "string.min": "Refer code must be of 6 digit",
      "string.empty": "Refer code cannot be empty.",
    }),
  });
  const { error } = schema.validate(req.body);

  error ? res.status(400).json(error.details[0].message) : next();
};

const LoginValidation = (req, res, next) => {
  const schema = Joi.object({
    phone: Joi.string(),
    // .pattern(/^[0-9]{10}$/)
    // .required()
    // .messages({
    //   "string.pattern.base": "Phone number must be a 10-digit number.",
    //   "string.empty": "Phone number cannot be empty.",
    // }),
    password: Joi.string()
    // .required().messages({
    //   "string.empty": "Password cannot be empty.",
    // }),
  });
  const { error } = schema.validate(req.body);

  error ? res.status(400).json(error.details[0].message) : next();
};

module.exports = { signUpValidation, LoginValidation };
