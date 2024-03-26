const { Joi, celebrate } = require("celebrate");

module.exports.validateNewUserInfo = (req, res, next) => {
  try {
    celebrate({
      body: Joi.object({
        name: Joi.string().min(2).max(30).required(),
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string()
          .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
          .required(),
        confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
        access_token: Joi.alternatives().try(Joi.string(), Joi.number()),
      }),
    })(req, res, next);
  } catch (error) {
    next(error);
  }
};
