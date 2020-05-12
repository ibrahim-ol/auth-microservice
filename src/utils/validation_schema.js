const Joi = require('@hapi/joi')



const registerSchema = Joi.object({
  first_name: Joi.string().required().alphanum().min(3).max(40),
  last_name: Joi.string().required().alphanum().min(3).max(40),
  email: Joi.string().required().email(),
  password: Joi.string().required()
})

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

const profileSchema = Joi.object({

})

const passwordChangeSchema = Joi.object({
  old_password: Joi.string().required(),
  new_password: Joi.string().required()
})


module.exports = {
  registerSchema,
  loginSchema,
  profileSchema,
  passwordChangeSchema
}