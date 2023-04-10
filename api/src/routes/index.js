const { Router } = require('express');
const {getAllGames} = require('../controllers/getAllGames');
const {getGame} = require('../controllers/getGame');
const {postNewGame} = require('../controllers/postNewGame');
const {getGenres} = require('../controllers/getGenresFromDB');
const { getPlatforms } = require('../controllers/getPlatformsFromDB');
const { getDevelopers } = require('../controllers/getDevelopersFromDB');
const { getStores } = require('../controllers/getStoresFromDB');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', (req, res) => {getAllGames(req, res)});
router.get('/videogames/detail', (req, res) => {getGame(req, res)});
router.get('/genres', (req, res) => {getGenres(req, res)});
router.get('/platforms', (req, res) => {getPlatforms(req, res)});
router.get('/developers', (req, res) => {getDevelopers(req, res)});
router.get('/stores', (req, res) => {getStores(req, res)});
router.post('/videogames', (req, res) => {postNewGame(req, res)})

module.exports = router;
