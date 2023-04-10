const {DataTypes} = require('sequelize');

const Genre = (sequelize) =>{
    sequelize.define('genres', {
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

module.exports = Genre