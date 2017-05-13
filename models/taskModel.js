module.exports = function(sequelize, DataTypes){
	var task = sequelize.define("Task", {
		task:{
			type:DataTypes.STRING

		},
		description:{
			type:DataTypes.TEXT

		},
		complete:{
			type:DataTypes.BOOLEAN

		},
		created_by:{
			type:DataTypes.STRING

		},
		assigned_to:{
			type:DataTypes.STRING

		},
		date_created:{
			type:DataTypes.DATE

		},
		date_due:{
			type:DataTypes.DATE

		},
		category:{
			type:DataTypes.STRING

		},
		drawing_Image:{
			type:DataTypes.BLOB

		},
		drawing_URL:{
			type:DataTypes.STRING
		},
		link:{
			type:DataTypes.STRING

		}
	}
	,
	{
		 timestamps: false
	}
	);
	return task;
};
