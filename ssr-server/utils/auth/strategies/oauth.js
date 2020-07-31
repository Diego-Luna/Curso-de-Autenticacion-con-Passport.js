const passport = require('passport');
const axios = require('axios');
const boom = require('@hapi/boom');
const { OAuth2Strategy } = require('passport-oauth');

const { config } = require('../../../config');

const GOOGLE_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://www.googleapis.com/oauth2/v4/token';
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo';

// preparamos nuestra estategia de Google
const oAuth2Strategy = new OAuth2Strategy(
  {
    authorizationURL: GOOGLE_AUTHORIZATION_URL,
    tokenURL: GOOGLE_TOKEN_URL,
    clientID: config.googleClientId,
    clientSecret: config.googleClientSecret,
    callbackURL: "/auth/google-oauth/callback"
  }, async function (accessToken, refreshToken, profile, cb) {
    const { data, status } = await axios({
      url: `${config.apiUrl}/api/auth/sign-provider`,
      method: "post",
      data: {
        name: profile.name,
        email: profile.email,
        password: profile.id,
        apiKeyToken: config.apiKeyToken
      }
    });

    // para ver que todo fue bien axios, si no lanzamos un error
    if (!data || status !== 200) {
      return cb(boom.unauthorized(), false);
    }

    // si todo fue muy bien
    return cb(null, data);
  }
);

oAuth2Strategy.userProfile = function (accessToken, done) {
  this._oauth2.get(GOOGLE_USERINFO_URL, accessToken, (err, body) => {
    // revisamos si hay un error
    if (err) {
      return done(err);
    }

    try {
      // sacamos del BODY
      const { sub, name, email } = JSON.parse(body);

      // construimos un nuevo profile
      const profile = {
        id: sub,
        name,
        email
      };

      done(null, profile);
    } catch (parseError) {
      return done(parseError);
    }
  })
}

passport.use("google-oauth", oAuth2Strategy);
