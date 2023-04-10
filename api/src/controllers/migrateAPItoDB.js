require('dotenv').config();
const { Genres, Platforms, Stores, Developers } = require('../db');

const axios = require('axios');

const { API_KEY } = process.env;

const pushAllStores = async() =>{
    try {
       
        const response = await axios.get(`https://api.rawg.io/api/stores?key=${API_KEY}`)
 
        const names = response.data['results'].map((store) => {
            return {'name' : store.name};
        });

        try{
            for (let data of names) {
                // busca si el registro ya existe por el nombre
                const dataExists = await Stores.findOne({ where: { name: data.name } });
                // si no existe el registro, lo crea
                if (!dataExists) {
                  await Stores.create(data);
                }
              }

              console.log("Stores cargadas con exito");
        } catch (err){
            console.log("Error al cargar las stores!");
        }

    } catch (err) {

        return (`¡Error al traer las stores!`);
    };
}

const pushAllPlatforms = async() =>{

    try {
       
        const response = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
 
        const names = response.data['results'].map((platform) => {
            return {'name' : platform.name};
        });

        try{
            for (let data of names) {
                // busca si el registro ya existe por el nombre
                const dataExists = await Platforms.findOne({ where: { name: data.name } });
                // si no existe el registro, lo crea
                if (!dataExists) {
                  await Platforms.create(data);
                }
              }

              console.log("Plataformas cargadas con exito");
        } catch (err){
            console.log("Error al cargar las plataformas!");
        }

    } catch (err) {

        return (`¡Error al traer las plataformas!`);
    };
}

const pushAllGenres = async () => {
 
    try {
       
        const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)

        const names = response.data['results'].map((genre) => {
            return {'name' : genre.name};
        });

        try{
            for (let data of names) {
                // busca si el registro ya existe por el nombre
                const dataExists = await Genres.findOne({ where: { name: data.name } });
                // si no existe el registro, lo crea
                if (!dataExists) {
                  await Genres.create(data);
                }
              }

              console.log("Generos cargados con exito");
        } catch (err){
            console.log("Error al cargar a los generos!");
        }

    } catch (err) {

        return (`¡Error al traer los generos!`);
    };

}

const pushAllDevelopers = async () => {
    try {
       
        const response = await axios.get(`https://api.rawg.io/api/developers?key=${API_KEY}`);

        const names = response.data['results'].map((genre) => {
            return {'name' : genre.name};
        });

        //Nuevo desarrollador agregado para agregar juegos independites o 
        // juegos que no son AAA
        names.push({name : 'Indie'});

        try{
            for (let data of names) {
                // busca si el registro ya existe por el nombre
                const dataExists = await Developers.findOne({ where: { name: data.name } });
                // si no existe el registro, lo crea
                if (!dataExists) {
                  await Developers.create(data);
                }
              }

              console.log("Desarrolladores cargados con exito");
        } catch (err){
            console.log("Error al cargar a los desarrolladores!");
        }
      

      
    } catch (err) {
       
        return (`¡Error al traer a los desarrolladores!`);
    };
}

module.exports = { pushAllGenres, pushAllPlatforms, pushAllStores, pushAllDevelopers }