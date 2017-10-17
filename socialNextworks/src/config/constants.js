export default {
  PORT: process.env.port || 4444,
  JWT_SECRET: 'TAKECAREYOURSELF',
  MONGO_URL: 'mongodb://localhost:27017/socials',

  PASSPORTCODE: 'I-LOVE-MEDITATION',
  IV: '#base64IV#',

  MAIL_HOST: 'smtp.mailtrap.io',
  MAIL_PORT: '2525',
  MAIL_USERNAME: 'a1285327665551',
  MAIL_PASSWORD: '0875bbf87059c7',
  //////////
  googleAuth : {
    'clientID'      : '139488542674-t0afi2bdmcf6os9ljvf527k80qrhqg5s.apps.googleusercontent.com',
    'clientSecret'  : 'hWXAlIxQGTDh7LATpTNaCTFy',
    'callbackURL'   : 'http://localhost:4444/auth/google/callback'
  }
}