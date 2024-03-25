const { Joi, celebrate } = require("celebrate");

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex({ prefix: "optional" }).required(),
  }),
});

module.exports.validateUserInfoBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    email: Joi.string().email({
      minDomainSegments: 2,
    }),
    password: Joi.string().required().messages({
      "string.empty": "Password field cannot be empty",
    }),
    // work on password confirmation
    // confirmPassword: Joi.string().required().messages({
    //   "string.empty": "Password field cannot be empty",
    // }),
  }),
});
// .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))

module.exports.validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({
      minDomainSegments: 2,
    }),
    password: Joi.string().required().messages({
      "string.empty": "Password field cannot be empty",
    }),
  }),
});

module.exports.validateUserUpdateBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
  }),
});

module.exports.validateMessageBody = celebrate({
  body: Joi.object.keys({
    message: Joi.string().required().min(1).max(100).messages({
      "string.min": 'The minimum length of the "message" field is 1 character',
      "string.max":
        'The maximum length of the "message" field is 100 characters',
      // "string.empty": 'The "message" field is required in order to get a response'
    }),
  }),
});

// avatar verification
// const validator = require("validator");

// const validateURL = (value, helpers) => {
//   if (validator.isURL(value)) {
//     return value;
//   }
//   return helpers.error("string.uri");
// };

// module.exports.validateCardBody = celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().required().min(2).max(30).messages({
//       "string.min": 'The minimum length of the "name" field is 2',
//       "string.max": 'The maximum length of the "name" field is 30',
//       "string.empty": 'The "name" field must be filled in',
//     }),
//     imageUrl: Joi.string().required().custom(validateURL).messages({
//       "string.empty": 'The "imageUrl" field must be filled in',
//       "string.uri": 'the "imageUrl" field must be a valid url',
//     }),
//     weather: Joi.string().valid("hot", "warm", "cold").required(),
//   }),
// });

// const passwordConfirmation = Joi.string().required().valid
