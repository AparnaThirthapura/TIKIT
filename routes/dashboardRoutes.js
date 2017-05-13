var path = require("path");
var db = require("../models");

module.exports = function(app){

  app.get("/dashboard/:userName", function(req, res){
    // console.log(req.params);
    var numCreated = 0;
    var numAssigned = 0;
    var numCompleted = 0;

    db.Task.findAll({
      where:{
        created_by:req.params.userName
      }
    }).then(function(dbTasks){
      numCreated = dbTasks.length;

      db.Task.findAll({
        where:{
          assigned_to:req.params.userName
        }
      }).then(function(dbTasks){
        numAssigned = dbTasks.length;

        db.Task.findAll({
          where:{
            complete:true
          }
        }).then(function(dbTasks){
          numCompleted = dbTasks.length;
          res.render("dashboard", {numCreated:numCreated, numAssigned:numAssigned, numCompleted:numCompleted});

        });

      });

    });
  });
};
