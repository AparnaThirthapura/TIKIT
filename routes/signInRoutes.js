var authController = require("../controller/authController.js");

module.exports = function(app, passport){
	app.get("/", function(req, res){
		// res.send("Welcome to Passport with Sequelize");
		res.render("home");
	});

	app.get("/signup", authController.signup);
	app.post("/signup", passport.authenticate("local-signup", {
		successRedirect:"/index",
		failureRedirect:"/signup"
	}));

	app.get("/login", authController.login);
	app.post("/login", passport.authenticate('local-login', {
						successRedirect: '/index',
						failureRedirect: '/login'
	}));
	app.get('/index', isLoggedIn, authController.index);

  app.get('/logout', authController.logout);

  function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');

    }
};
