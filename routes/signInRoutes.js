var path = require("path");
var db = require("../models");

module.exports = function(app){
	app.get("/", function(req, res){
		res.render("home");
	});

	app.get("/login", function(req, res){
		res.render("login");
	});

	app.post("/login", function(req, res){
	    console.log(req.body);
	    db.User.findOne({where:{userEmail:req.body.email}}).then(function(dbUser){
	      console.log(dbUser);
				if (dbUser === null) {
					res.render("login")
				}
				else {
					if(dbUser.userPassword === req.body.password) {
						db.Task.findAll({

						}).then(function(dbTasks){
							res.render("index", { userName: dbUser.userName,
																		dbTask:dbTasks});
						});

					} else {
						res.render("login");
					}
				}
	    });
  	});


	app.get("/signup", function(req, res){
		res.render("signup");
	});

		app.post("/signup", function(req, res){
	    console.log(req.body);
	    db.User.create({
				userName:req.body.name,
				userEmail:req.body.email,
				userPassword:req.body.password
			}).then(function(dbUser){
				db.Task.findAll({

				}).then(function(dbTasks){
					res.render("index", { userName: dbUser.userName,
																dbTask:dbTasks});
				});
	    });
  	});


		app.get("/logout", function(req, res){
			res.render("home");
		});

};
