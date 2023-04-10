require('dotenv').config();

const {Videogames, Genres} = require('../db');
const axios = require('axios');
const {API_KEY} = process.env;

const getAllGames = async(req, res) => {

    let allGames = [];

    try{

        
        for (let i = 1; i <= 5; i++){
        
            
            const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)  
                
                
            allGames = [...allGames, ...response.data.results];
        
        }

        const dbResponse = await Videogames.findAll({
            include: [
            {
                model: Genres,
                attributes: ['name'],
                through: { attributes: [] }
            }]});

        let imgBase64 = '';
        let imgData = '';
1
        for (const game of dbResponse){
           
         
            imgBase64 = game.img.toString('base64');
            const buffer = Buffer.from(imgBase64, 'base64');

         
            imgData = `${buffer}`
            game.img = imgData;
        }

        allGames = [...allGames, ...dbResponse];

        res.status(200);
        return res.json(allGames);
        
    } catch(err){
        res.status(404);
        console.log(err)
        return res.json({
                error : err,
                message :`¡Error al traer los juegos!`
        });
    };

   
}

module.exports = {getAllGames}