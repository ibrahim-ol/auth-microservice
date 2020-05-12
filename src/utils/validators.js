const validationSchema = require('./validation_schema') 

const generalValidator = (schema, req, res, next) => {
  const {error, value} = schema.validate(req.body, {abortEarly: false})
  if(error) {
    const response = {}
    response.errors = error.details.map( err => ({[err.path]: err.message}))
    response.error_messages = error.message.split('. ')
    response.status = false
    response.message = 'Validation error'
    return res.status(422).json(response)
  }else{
    req.validated_value = value
  }
  next()
}


const registrationValidator = (req, res, next) => generalValidator(validationSchema.registerSchema, req, res, next)
const loginValidator = (req, res, next) => generalValidator(validationSchema.loginSchema, req, res, next)
const profileValidator = (req, res, next) => generalValidator(validationSchema.profileSchema, req, res, next)
const changePasswordValidator = (req, res, next) => generalValidator(validationSchema.passwordChangeSchema, req, res, next)


module.exports = {
  registrationValidator,
  loginValidator,
  profileValidator,
  changePasswordValidator
}