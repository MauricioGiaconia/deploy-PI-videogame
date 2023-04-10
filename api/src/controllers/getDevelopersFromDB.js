const {Developers} = require('../db');

const getDevelopers = async (req, res) =>{

    try{

        const allDevelopers = await Developers.findAll();
        res.status(200);
        res.json(allDevelopers);

    } catch(err){

        res.status(404);
        return res.json( {error : err,
                        message : 'Error al traer a los desarrolladores!'});
    }
}

module.exports = {getDevelopers}