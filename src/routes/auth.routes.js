const router = require('express').Router();
const authController = require('../controllers/AuthController')
const validators = require('../utils/validators')
const helper = require('../utils/helpers')

const auth = new authController()

router.post('/login', auth.login)
router.post('/register', validators.registrationValidator, auth.registration)

router.get('/user', helper.authenticateJWT, auth.getProfile)
router.post('/password/change', helper.authenticateJWT(), validators.changePasswordValidator, auth.changePassword)
module.exports = router