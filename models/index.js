const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv').config();

const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
  dialect: 'postgres',
});

const Users = sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  
  const Records = sequelize.define('Records', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: 'id'
      },
      allowNull: false
    },
    data: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  
  // Relationships
  Users.hasMany(Records, { as: 'records', foreignKey: 'userId' });
  Records.belongsTo(Users, { as: 'user', foreignKey: 'userId' });
  
  module.exports = { sequelize, Users, Records };