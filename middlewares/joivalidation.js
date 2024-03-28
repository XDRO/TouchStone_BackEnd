const { Joi, celebrate } = require("celebrate");

module.exports.validateNewUserInfo = (req, res, next) => {
  try {
    celebrate({
      body: Joi.object({
        name: Joi.string().min(2).max(30).required().label("name").messages({
          "string.min":
            "The minimum length of the '{#label}' field is 2 characters",
          "string.max":
            "The maximum length of the '{#label}' field is 30 characters",
          "any.required": "The '{#label}' field must be filled",
        }),
        email: Joi.string()
          .email({ minDomainSegments: 2 })
          .required()
          .label("email")
          .messages({
            "any.required": " '{#label}' field is required",
            "string.email": "Invalid '{#label}' ",
          }),
        password: Joi.string()
          .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
          .required()
          .label("password")
          .messages({
            "any.required": " '{#label}' field is required",
            "string.pattern.base": "Invalid format for '{#label}' ",
          }),
        confirm_password: Joi.string()
          .valid(Joi.ref("password"))
          .required()
          .label("confirm password")
          .messages({
            "any.required": " '{#label}' field is required",
            "any.only": " '{#label} field must match the password field",
          }),
      }),
    })(req, res, next);
  } catch (e) {
    console.log(e.details);
    next(e);
  }
};

module.exports.validateUserLogin = (req, res, next) => {
  try {
    celebrate({
      body: Joi.object().keys({
        email: Joi.string()
          .email({ minDomainSegments: 2 })
          .required()
          .label("email")
          .messages({
            "any.required": " '{#label}' field is required",
            "string.email": "Invalid '{#label}' ",
          }),
        password: Joi.string()
          .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
          .required()
          .label("password")
          .messages({
            "any.required": " '{#label}' field is required",
            "string.pattern.base": "Invalid format for '{#label}' ",
          }),
      }),
    })(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.validateMessage = (req, res, next) => {
  try {
    celebrate({
      body: Joi.object().keys({
        message: Joi.string().required().label("message").messages({
          "any.required": " '{#label}' field is required for response",
        }),
      }),
    })(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.validateResponse = (req, res, next) => {
  try {
    celebrate({
      body: Joi.object().keys({
        response: Joi.string().required().label("response").messages({
          "any.required":
            " '{#label}' an error occured when generating a response",
        }),
      }),
    })(req, res, next);
  } catch (e) {
    next(e);
  }
};
