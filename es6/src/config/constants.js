const devConfig = {
  MONGO_URL: 'localhost:27017/es6',
  JWT_SECRET: 'ILOVELIFE',
  PASSPORTCODE: 'I-LOVE-MOM',
  MAIL_HOST: 'smtp.mailtrap.io',
  MAIL_PORT: '2525',
  MAIL_USERNAME: 'a1285327665551',
  MAIL_PASSWORD: '0875bbf87059c7',
};

const testConfig = {
  MONGO_URL: 'localhost:27017/es6',
};

const prodConfig = {
  MONGO_URL: 'localhost:27017/es6',
};

const defaultConfig = {
  PORT: process.env.PORT || 4000,
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};
