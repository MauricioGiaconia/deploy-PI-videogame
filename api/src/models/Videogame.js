const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

const Videogame = (sequelize) => {
  // defino el modelo
  sequelize.define('videogames', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    released: {
      type: DataTypes.DATE,
      allowNull: false
    },
    img: {
      type:DataTypes.BLOB,
      allowNull: false
    },
    aditionalImg: {
      type:DataTypes.BLOB,
      allowNull: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    force: false
  });
};

module.exports = Videogame

