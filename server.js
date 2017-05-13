//server file for Tic-It App

var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");

var port = process.env.PORT || 3000;

var app = express();

var db = require("./models");

app.use(express.static(process.cwd() + "/public"));


app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/signInRoutes.js")(app);
require("./routes/taskRoutes.js")(app);
require("./routes/searchRoutes.js")(app);
require("./routes/dashboardRoutes.js")(app);

db.sequelize.sync().then(function(){
	app.listen(port, function(){
		console.log("App listening on PORT" + port);
	});
});
