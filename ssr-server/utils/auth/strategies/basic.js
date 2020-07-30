const passport = require("passport");
const { BasicStrategy } = require("passport-http");
const boom = require("@hapi/boom");
const axios = require("axios");
const { config } = require("../../../config/index");

passport.use(
  new BasicStrategy(async function(email, password, cb) {
    try {
      const { data, status } = await axios({
        url: `${config.apiUrl}/api/auth/sign-in`,
        method: "post",
        auth: {
          password,
          username: email
        },
        data: {
          apiKeyToken: config.apiKeyToken
        }
      });

      if (!data || status !== 200) {
        return cb(boom.unauthorized(), false);
      }

      return cb(null, data);
    } catch (error) {
      cb(error);
    }
  })
)


// diego
// const passport = require('passport');
// const { BasicStrategy } = require('passport-http');
// const boom = require('@hapi/boom');
// const axios = require('axios');
// const { config } = require("../../../config/index");

// // hacemos nuestra estrategia
// passport.use(
//   new BasicStrategy(async function(email, password, cb) {
//     try {
//       // optenemos los datos de axios
//       const { data, status } = await axios({
//         url: `${config.apiUrl}/api/auth/sign-in`,
//         method: 'post',
//         auth: {
//           password,
//           username: email
//         },
//         // data: {
//         //   apiKeyToken: config.apiKeyToken
//         // }
//       });

//       // si no hay data, o el status no es diferente a 200
//       if (!data || status !== 200) {
//         // el usuario es false
//         return cb(boom.unauthorized(), false);
//       }

//       //  si hay data, y el estatus es 200
//       return cb(null, data);
//     } catch (error) {
//       cb(error);
//     }
//   })
// );
