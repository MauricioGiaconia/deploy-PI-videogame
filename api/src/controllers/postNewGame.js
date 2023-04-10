const { Videogames, VideogameGenres, VideogamePlatforms, VideogameStores, VideogameDevelopers } = require('../db');


const postNewGame = async (req, res) =>{

    try{

        const data = req.body;

        if (data.title && data.description && data.release && data.img && data.rating && data.genres && data.platforms && data.developer && data.stores){
            const newGame = await Videogames.create({
                name : data.title,
                description : data.description,
                released : data.release,
                img : data.img,
                aditionalImg : data.aditionalImg,
                rating : data.rating,
             
            });

            for (const idG of data.genres){
                await VideogameGenres.create({
                    videogameId : newGame.dataValues['id'],
                    genreId : idG
                })
            }

            for (const idP of data.platforms){
                await VideogamePlatforms.create({
                    videogameId : newGame.dataValues['id'],
                    platformId : idP
                })
            }

            for (const idS of data.stores){
                await VideogameStores.create({
                    videogameId : newGame.dataValues['id'],
                    storeId : idS
                })
            }

            await VideogameDevelopers.create({
                videogameId : newGame.dataValues['id'],
                developerId : data.developer
            })

            return res.status(201).json({message : 'Juego cargado con exito'});
        } else{
            return res.status(200).json({message : 'Faltan datos necesarios para cargar el juego!'});
        }

        

        

    } catch (err){
        console.log(err);
        return res.status(500).json({message : 'Error al cargar el juego'});
    }
}


module.exports = {postNewGame};