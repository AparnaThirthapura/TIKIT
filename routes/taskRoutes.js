var path = require("path");
var db = require("../models");

module.exports = function(app){

  app.get("/dashboard", function(req, res){
    res.render("dashboard");
  });
  app.get("/search", function(req, res){
    res.render("search");
  });
  app.get("/addTask/:userName", function(req, res){
    res.render("task", {userName:req.params.userName});
  });

	app.post("/addTask/:userName", function(req, res){
	    console.log("============");
      console.log("Request body for adding task:");
      console.log(req.body);
	    db.Task.create({
        task:req.body.taskName,
        description:req.body.taskDescription,
        complete:false,
        created_by:req.params.userName,
        assigned_to:req.body.assigned_to,
        category:req.body.taskCategory,
        date_created:new Date(),
        date_due:req.body.dueDate,
        // drawing_Image:
        drawing_URL:req.body.imageURL,
        link:req.body.taskLink
      }).then(function(dbTask){
	      // console.log(dbTask);
        console.log("Going back to index page...");
        db.Task.findAll({

        }).then(function(dbTasks){
          res.render("index", { userName: req.params.userName,
                                dbTask:dbTasks});
        });
	    });
  });

  app.get("/getTask", function(req, res){
    db.Task.find({

    }).then(function(dbTask){
      console.log(dbTask);
      res.render("index", {dbTask});
    });
  });
};
