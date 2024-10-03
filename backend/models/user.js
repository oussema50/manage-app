const { DataTypes } = require('sequelize');
const sequelize = require('../db/index');

const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false, 
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false, 
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true, 
        validate: {
          isEmail: true, 
        },
      },
      age: {
        type: DataTypes.INTEGER, 
        allowNull: true, 
        validate: {
          isInt: true, 
          min: 0, 
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false, 
      },
    role: {
        type: DataTypes.ENUM('rh', 'employee'), // Define possible values for role
        allowNull: false,
      },
      
},{
    timestamps: true, 
    tableName: 'users',
  });

  

  (async () => {
    await sequelize.sync({ force: false });
    // Code here
  })();
module.exports = User;