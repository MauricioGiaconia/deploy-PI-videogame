import axios from 'axios';

export const GET_GAMES = 'GET_GAMES';
export const GET_GENRES = 'GET_GENRES';
export const GET_DEVELOPERS = 'GET_DEVELOPERS';
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const GET_STORES = 'GET_STORES';
export const GET_GAME = 'GET_GAME';
export const RESET_GAMES = 'RESET_GAMES';
export const SET_ERROR = 'SET_ERROR';
export const SEARCH_NAME = 'SEARCH_NAME';
export const SORT_ORDER = 'SORT_ORDER';
export const FILTER_GAMES = 'FILTER_GAMES'


export const getGames = () => {

    return (async function (dispatch){

        try{
            const response = await axios.get('/videogames');

            return dispatch({ type: GET_GAMES, payload: { games: response.data} });
                  
        } catch (err){
            
  
           return dispatch({ type: SET_ERROR, payload:  {error: err.response.status, message: err.response.data['message']} });
        }


    })
}

export const getGenres = () =>{
    return (async function (dispatch){
        try{

            const response = await axios.get('/genres');

            return dispatch({type: GET_GENRES, payload: {genres : response.data}});

        } catch(err){
            return dispatch({type: SET_ERROR, payload: {error: err.response.status, message: err.response.data['message']}})
        }
    });
}

export const getPlatforms = () =>{
    return (async function (dispatch){
        try{

            const response = await axios.get('/platforms');

            return dispatch({type: GET_PLATFORMS, payload: {platforms : response.data}});

        } catch(err){
            return dispatch({type: SET_ERROR, payload: {error: err.response.status, message: err.response.data['message']}})
        }
    });
}

export const getDevelopers = () =>{
    return (async function (dispatch){
        try{

            const response = await axios.get('/developers');

            return dispatch({type: GET_DEVELOPERS, payload: {developers : response.data}});

        } catch(err){
            return dispatch({type: SET_ERROR, payload: {error: err.response.status, message: err.response.data['message']}})
        }
    });
}

export const getStores = () =>{
    return (async function (dispatch){
        try{

            const response = await axios.get('/stores');

            return dispatch({type: GET_STORES, payload: {stores : response.data}});

        } catch(err){
            return dispatch({type: SET_ERROR, payload: {error: err.response.status, message: err.response.data['message']}})
        }
    });
}

export const getGame = (id, db = false) =>{
    return (async function (dispatch){

        try{
            const response = await axios.get(`/videogames/detail?id=${id}&db=${db}`);

            return dispatch({type: GET_GAME, payload: {game : response.data}});

        } catch(err){
            return dispatch({type: SET_ERROR, payload: {error: err.response.status, message: err.response.data['message']}})
        }
    })
}

export const cleanGame = (dispatch) => {
    return dispatch({type: GET_GAME, payload: {game : []}})
}

export const postNewGame = (game) =>{
    return (async function (dispatch){
        
        try{
            const response = await axios.post('/videogames', game);
            console.log(response.data['message']);
        } catch(err){
            return dispatch({type: SET_ERROR, payload: {error: err.response.status, message: err.response.data['message']}})
        }
        
    });
}

export const resetToOriginalGames = (dispatch) => {
    return dispatch({type: RESET_GAMES, payload : {}});
}

export const searchByName = (dispatch, name) => {
    return dispatch({type: SEARCH_NAME, payload : name});
}

export const sortByOrder = (dispatch, order) =>{
    return dispatch({type: SORT_ORDER, payload: order});
}

export const filterGames = (dispatch, value) => {
  
    return dispatch({type: FILTER_GAMES, payload: value});
}