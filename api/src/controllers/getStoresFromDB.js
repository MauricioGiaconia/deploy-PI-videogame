const {Stores} = require('../db');

const getStores = async (req, res) =>{

    try{

        const allStores = await Stores.findAll();
        res.status(200);
        res.json(allStores);

    } catch(err){

        res.status(404);
        return res.json( {error : err,
                        message : 'Error al traer las plataformas'});
    }
}

module.exports = {getStores}