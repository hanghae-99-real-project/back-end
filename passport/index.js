// const passport = require('passport');
// const KakaoStrategy = require('passport-kakao').Strategy;
// const { User } = require('../models');

// module.exports = (app) => {
//     app.use(passport.initialize()); 
//     passport.use(
//         new KakaoStrategy({
//             clientID: process.env.KAKAO_ID, 
//             callbackURL: process.env.KAKAO_URL, 
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             try {
//                 const exUser = await User.findOne({
//                     where: { snsId: profile.id,  },
//                 });

//                 if (exUser) {
//                     done(null, exUser);
//                 } else {
//                     const newUser = await User.create({
//                         email: profile._json && profile._json.kakao_account_email,
//                         nickname: profile.displayName,
//                         snsId: profile.id,
//                         providerType: 'kakao',
//                     });
//                     done(null, newUser); 
//                 }
//             } catch (error) {
//                 console.error(error);
//                 done(error);
//             }
//         },
//         ),
//     );
//     passport.serializeUser((user,done)=>{ 
//         done(null,user);
//     });
//     passport.deserializeUser((user,done)=>{
//         done(null,user);
//     });
// };