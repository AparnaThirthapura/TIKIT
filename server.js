//server file for Tic-It App
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");
var passport = require("passport");
var session = require("express-session");
var env = require("dotenv").load();

var port = process.env.PORT || 3000;

app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
	secret:"keyboard cat",
	resave:true,
	saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride("_method"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var db = require("./models");
require("./config/passport/passport.js")(passport);
var authRoute = require("./routes/signInRoutes.js")(app, passport);
require("./routes/taskRoutes.js")(app);
require("./routes/searchRoutes.js")(app);
require("./routes/dashboardRoutes.js")(app);

db.sequelize.sync({force:true}).then(function(){
	app.listen(port, function(err){
		if(!err)
			console.log("Server running on PORT" + port);
		else {
			console.log(err);
		}
	});
	console.log("DB Looks fine");
}).catch(function(err){
	console.log(err, "Something went wrong with the DB");
});
