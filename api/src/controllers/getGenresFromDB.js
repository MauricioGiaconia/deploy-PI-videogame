const {Genres} = require('../db');

const getGenres = async (req, res) =>{

    try{

        const allGenres = await Genres.findAll();
        res.status(200);
        res.json(allGenres);

    } catch(err){

        res.status(404);
        return res.json( {error : err,
                        message : 'Error al traer los generos'});
    }
}

module.exports = {getGenres}