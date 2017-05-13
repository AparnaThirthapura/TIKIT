var path = require("path");
var db = require("../models");

module.exports = function(app){

  app.get("/search", function(req, res){
    res.render("search");
  });

	app.post("/searchTask", function(req, res){
	    console.log(req.body);
      db.Task.findAll({
          where:{task:{
            $like:"%"+req.body.taskName+"%"
          }}
      }).then(function(dbSearch){
        console.log(dbSearch);
        res.render("search", {dbTask:dbSearch});
      });
  });

	app.post("/searchUser", function(req, res){
	    console.log(req.body);
      db.Task.findAll({
          where:{
            assigned_to:req.body.userName
          }
      }).then(function(dbSearch){
        console.log(dbSearch);
        res.render("search", {dbTask:dbSearch});
      });
  });


};
