const defaultConfig = {
  PORT: process.env.PORT || 4445
}

const config = {
  development: {
    MONGO_URL: 'mongodb://localhost:27017/socials',
    JWT_SECRET: 'meditation',
    JWT_SECRET2: 'meditation2',

    PASSPORTCODE: 'I-LOVE-MEDITATION',
    IV: '#base64IV#',

    MAIL_HOST: 'smtp.mailtrap.io',
    MAIL_PORT: '2525',
    MAIL_USERNAME: 'a1285327665551',
    MAIL_PASSWORD: '0875bbf87059c7',
  },
  production: {
    MONGO_URL: 'mongodb://localhost/user-authentication-prod',
  }
}

function getEnv(env) {
  return config[env];
}

export default {
    ...defaultConfig,
    ...getEnv(process.env.NODE_ENV),
}