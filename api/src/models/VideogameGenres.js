const { DataTypes, UUIDV4 } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

const VideogameGenres = (sequelize) => {
  // defino el modelo
  sequelize.define('videogameGenres', {
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
    genreId : {
        type: DataTypes.INTEGER,
        allowNull : false,
        references : {
            model :'genres',
            key : 'id'
        }
    }
    
  }, {
    force: false
  });
};

module.exports = VideogameGenres

