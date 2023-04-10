require('dotenv').config();

const { Videogames, Genres, Developers, Stores, Platforms } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;

const getGame = async (req, res) => {


    try {

        const id = req.query.id;
        const isDatabase = req.query.db;

        if (isDatabase === 'false') {

            const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
            res.status(200);
            return res.json(response.data);
        } else {
            Videogames.findByPk(id, {
                include: [
                    {
                        model: Genres,
                        attributes: ['name'],
                        through: { attributes: [] }
                    },
                    {
                        model: Developers,
                        attributes: ['name'],
                        through: { attributes: [] }
                    },
                    {
                        model: Stores,
                        attributes: ['name'],
                        through: { attributes: [] }
                    },
                    {
                        model: Platforms,
                        attributes: ['name'],
                        through: { attributes: [] }
                    }
                ]
            }
            )
                .then(dataGame => {

                    if (dataGame) {
                      
                        let imgBase64 = dataGame.img.toString('base64');
                        let buffer = Buffer.from(imgBase64, 'base64');
                        let imgData = `${buffer}`;

                        dataGame.img = imgData;

                        if (dataGame.aditionalImg){
                            imgBase64 = dataGame.aditionalImg.toString('base64');
                            buffer = Buffer.from(imgBase64, 'base64');
                            imgData = `${buffer}`;
                            dataGame.aditionalImg = imgData;
                        }
                        return res.status(200).json(dataGame);

                    } else {
                        return res.status(404).json({
                            error: 'NO SE ENCUENTRA EN LA DB',
                            message: `¡Juego no encontrado!`
                        });

                    }
                });
        }






    } catch (err) {
        res.status(404);
        return res.json({
            error: err,
            message: `¡Error al traer el juego!`
        });
    };


}

module.exports = { getGame }