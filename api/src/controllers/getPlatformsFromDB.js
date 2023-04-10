const {Platforms} = require('../db');

const getPlatforms = async (req, res) =>{

    try{

        const allPlatforms = await Platforms.findAll();
        res.status(200);
        res.json(allPlatforms);

    } catch(err){

        res.status(404);
        return res.json( {error : err,
                        message : 'Error al traer las plataformas'});
    }
}

module.exports = {getPlatforms}