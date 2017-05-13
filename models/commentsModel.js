module.exports = function(sequelize, DataTypes){
	var Comments = sequelize.define("Comments", {
		taskComments:{
			type:DataTypes.STRING
		},
		taskID:{
			type:DataTypes.INTEGER
		}
	},
	{
		timestamps: false
	}
	);

	return Comments;
};
