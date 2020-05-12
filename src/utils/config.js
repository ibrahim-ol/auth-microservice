require('dotenv').config()

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGO_CONNECTION_URL || '',
  SECRET: process.env.APP_KEY,
  JWT_OPTION: {
    expiresIn: "10m",
    issuer: 'auth_microservice',
  }
}