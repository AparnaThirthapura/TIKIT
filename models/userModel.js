module.exports = function(sequelize, DataTypes){
	var User = sequelize.define("User", {
		userName:{
			type:DataTypes.STRING
		},
		userEmail:{
			type:DataTypes.STRING
		},
		userPassword:{
			type:DataTypes.STRING
		},
		createdAt:{
			type:DataTypes.DATE
		},
		updatedAt:{
			type:DataTypes.DATE
		}

	});
	return User;
};
