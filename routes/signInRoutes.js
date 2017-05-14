var db = require("../models");

module.exports = function(app, passport){

	app.get("/", function(req, res){
		res.render("home");
	});

	app.get("/signup", function(req, res) {
		res.render("signup");
	});

	app.post("/signup", passport.authenticate("local-signup", {
		successRedirect:"/index",
		failureRedirect:"/signup"
	}));

	app.get("/login", function(req, res){
		res.render("login");
	});

	app.post("/login", passport.authenticate("local-login", {
						successRedirect: "/index",
						failureRedirect: "/login"
	}));

	app.get("/index", isLoggedIn, function(req, res){
		db.Task.findAll({
			where:{created_by:req.user.userName}
		}).then(function(dbTasks){
			res.render("index", { userName: req.user.userName,
														dbTask:dbTasks});
		});
	});

  app.get("/logout", function(req, res) {
	    req.session.destroy(function(err) {
	        res.redirect('/');
	    });
	});

  function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect("/signin");

    }
};
