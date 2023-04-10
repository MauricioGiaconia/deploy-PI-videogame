const {DataTypes} = require('sequelize'); 

const Developers = (sequelize) => {
    sequelize.define('developers', {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false
        }
    }, {
        force: false
    })
};

module.exports = Developers;