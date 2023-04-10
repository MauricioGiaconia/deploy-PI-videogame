const {DataTypes} = require('sequelize'); 

const Platform = (sequelize) => {
    sequelize.define('platforms', {
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

module.exports = Platform;