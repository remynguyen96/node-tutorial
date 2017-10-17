import { Router } from 'express';
import passport from 'passport';
import passportGoogle from 'passport-google-oauth20';
import constants from '../../config/constants';

const routes = new Router();
const GoogleStrategy = passportGoogle.Strategy;

routes.get('/test', (req, res) => {
  let configGoogle = constants.googleAuth;
  console.log(configGoogle);
  return res.status(200).json('Hello Friends');
});


// routes.get('/auth/google', passport.authenticate('google', {
//   scope: ['profile', 'email']
// }));
//

// routes.get('/auth/google/callback', passport.authenticate('google', {
//   // successRedirect: '/profile',
//   failureRedirect: '/test'
// }),(req, res) => {
//     return res.status(200).json('Login with google by nodejs Successful !!!');
// });


// passport.use(new GoogleStrategy({
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://www.example.com/auth/google/callback"
//     },
//     function(accessToken, refreshToken, profile, cb) {
//       User.findOrCreate({ googleId: profile.id }, function (err, user) {
//         return cb(err, user);
//       });
//     }
// ));




export default routes;
