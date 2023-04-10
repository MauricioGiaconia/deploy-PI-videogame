const { DataTypes, UUIDV4 } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

const VideogameStores = (sequelize) => {
  // defino el modelo
  sequelize.define('videogameStores', {
    id: {
      type: DataTypes.INTEGER,
     
      primaryKey: true,
      autoIncrement : true,
      allowNull: false
    },
    videogameId: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull : false,
        references : {
            model :'videogames',
            key : 'id'
        }
    },
    storeId : {
        type: DataTypes.INTEGER,
        allowNull : false,
        references : {
            model :'stores',
            key : 'id'
        }
    }
    
  }, {
    force: false
  });
};

module.exports = VideogameStores

