const { Sequelize } = require('sequelize');

export default new Sequelize('users', 'root', 'password', {
    dialect: 'mysql',
    host: 'localhost'
});
