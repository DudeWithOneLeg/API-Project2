'use strict';
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Event, {
        through: models.Attendance,
        otherKey: 'eventId',
        foreignKey: 'userId'
      })
      User.hasMany(models.Membership, {
        foreignKey: 'userId',
      })

      User.hasMany(models.Group, {
        foreignKey: 'organizerId',
      })
      User.hasMany(models.Attendance, {
        foreignKey: 'userId'
      })
    }
  }
  User.init({
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30]
      },
      isNotEmail(val) {
        if (Validator.isEmail(val)) {
          throw Error('Cannot be email.')
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    }
  });
  return User;
};
