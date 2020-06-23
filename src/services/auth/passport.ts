import passport from 'passport';
import { keys } from '../../config/keys';
import { Strategy as googleOAuth } from 'passport-google-oauth2';
import mongoose from 'mongoose';

export default () => {
  const User = mongoose.model('user-accounts');
  passport.use(
    new googleOAuth(
      {
        clientID: keys.googleClientId,
        clientSecret: keys.googleSecret,
        callbackURL: '/auth/google/callback',
        passReqToCallback: true,
      },
      async (
        _req: any,
        _accessToken: any,
        _refreshToken: any,
        profile: any,
        done: (arg0: null, arg1: any) => any
      ) => {
        // let googlePlus = JSON.parse(profile._raw);

        const user: any = await User.findOne({ googleId: profile.id });
        if (user) {
          return done(null, user);
        } else {
          const newUser: any = await new User({
            _id: new mongoose.Types.ObjectId(),
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            photos: profile.photos,
            createdDate: new Date(),
            // gender: profile.gender,
            provider: 'google',
          }).save();
          console.log('User *********** not found' + newUser._id);
          done(null, newUser);
        }

        // return done(null, { user: 'mahesh', pass: '1123456', id: '123' });
      }
    )
  );
  passport.serializeUser((user: any, done: any) => {
    console.log('serializeUser ' + user);
    done(null, user.googleId);
  });
  passport.deserializeUser(async (id, done) => {
    let user: any = await User.findOne({ googleId: id });
    if (user) {
      console.log('gdg_  ' + id + ' : ' + JSON.stringify(user));
      done(null, user);
    }
  });
};
