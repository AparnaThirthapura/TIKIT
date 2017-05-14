var bCrypt = require("bcrypt-nodejs");

var db = require("../../models");

module.exports = function(passport){

  var LocalStrategy = require("passport-local").Strategy;

  passport.use('local-signup', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, email, password,done){
      var generateHash = function(password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

      };
      db.User.findOne({
        where: {
        userEmail: email
        }
      }).then(function(user) {
          if (user)
            {
                return done(null, false, {
                  message: 'That email is already taken'
                });
            } else
            {
                var userPassword = generateHash(password);
                var data =
                {
                  userEmail: email,
                  userPassword: userPassword,
                  userName:req.body.name
                };
                db.User.create(data).then(function(newUser, created) {
                  if (!newUser) {
                    return done(null, false);
                  }
                  if (newUser) {
                    return done(null, newUser);
                  }
                });
            }
        });
    }
  ));

  passport.use('local-login', new LocalStrategy(
      {
          // by default, local strategy uses username and password, we will override with email
          usernameField: 'email',
          passwordField: 'password',
          passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, email, password, done) {
          console.log("Validating: " + email + " " + password);

          var isValidPassword = function(userpass, password) {
              return bCrypt.compareSync(password, userpass);
          }

          db.User.findOne({
              where: {
                  userEmail: email
              }
          }).then(function(user) {
              console.log("inside findOne DB function" + user);
              console.log("email: " + user.userEmail);
              console.log("password: " + user.userPassword);



              if (!user) {
                  return done(null, false, {
                      message: 'Email does not exist'
                  });
              }
              if (!isValidPassword(user.userPassword, password)) {
                  return done(null, false, {
                      message: 'Incorrect password.'
                  });
              }
              var userinfo = user.get();
              return done(null, userinfo);
          }).catch(function(err) {
              console.log("Error while login:", err);
              return done(null, false, {
                  message: 'Something went wrong with your Signin'
              });
          });
      }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    db.User.findById(id).then(function(user) {
        if (user) {
            done(null, user.get());
        } else {
            done(user.errors, null);
        }
    });
  });
}
