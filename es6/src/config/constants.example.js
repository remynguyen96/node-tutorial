const devConfig = {
  MONGO_URL: 'localhost:27017/example',
  JWT_SECRET: '...',
  PASSPORTCODE: '...',
  MAIL_HOST: '...',
  MAIL_PORT: '...',
  MAIL_USERNAME: '...',
  MAIL_PASSWORD: '...',
};

const testConfig = {
  MONGO_URL: 'localhost:27017/example',
};

const prodConfig = {
  MONGO_URL: 'localhost:27017/example',
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
