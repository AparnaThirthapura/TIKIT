module.exports = function(sequelize, DataTypes){
	var User = sequelize.define("User", {
		id:{
			autoIncrement:true,
			primaryKey:true,
			type:DataTypes.INTEGER
		},
		userName:{
			type:DataTypes.STRING
		},
		userEmail:{
			type:DataTypes.STRING,
			validate:{
				isEmail:true
			}
		},
		userPassword:{
			type:DataTypes.STRING,
			allowNull:false
		},
		createdAt:{
			type:DataTypes.DATE
		},
		updatedAt:{
			type:DataTypes.DATE
		},
		lastLogin:{
			type:DataTypes.DATE
		},
		status:{
			type:DataTypes.ENUM("active", "inactive"),
			defaultValue:"active"
		}

	});
	return User;
};
