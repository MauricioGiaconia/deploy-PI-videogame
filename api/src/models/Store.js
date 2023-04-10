const {DataTypes} = require('sequelize'); 

const Store = (sequelize) => {
    sequelize.define('stores', {
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
}

module.exports = Store;