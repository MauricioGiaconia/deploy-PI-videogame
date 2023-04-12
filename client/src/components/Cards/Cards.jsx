import Card from '../Card/Card.jsx';
import {useSelector, useDispatch} from 'react-redux';
import { cleanGame, filterGames, getGames, resetToOriginalGames, searchByName, sortByOrder } from '../../redux/actions/index.js';
import { useEffect, useState } from 'react';
import styles from './Cards.module.css';
import Loading from '../Loading/Loading.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import Error from '../Error/Error.jsx';

export default function Cards(props){

    const dispatch = useDispatch();
    const games = useSelector((state) => state.games);
    const gamesPerPage = 15;
    const [isLoading, setIsLoading] = useState(true);
    const [numPage, setNumPage] = useState(1);
    const [gamesToShow, setGamesToShow] = useState([]);
 
    const totalGames = Math.ceil(games.length / gamesPerPage);
    //Cada vez que entro a la pagina de juegos, limpio el array global del juego traido por ID
    cleanGame(dispatch);

    //En la primera carga de la pagina, traigo todos los juegos
    useEffect(() => {
        
        if (games.length === 0){

            dispatch(getGames())
            .finally(() => { setIsLoading(false)});
           
            

        } else{
            const indexLastGame = numPage * gamesPerPage;
            const indexFirstGame = indexLastGame - gamesPerPage;
            setGamesToShow(games.slice(indexFirstGame, indexLastGame));
         
        }
        
     
        
    }, [games, numPage]);

 
    if (isLoading){
        return <>
            <Loading></Loading>
           </>
            
        
    }

    const PrintGames = () => gamesToShow.map((game) => {
        return <Card key = {game.id}
                    id = {game.id}
                    title = {game.name}
                    rating = {game.rating}
                    release = {game.released}
                    genres = {game.genres}
                    img = {game.background_image ? game.background_image : game.img}></Card>
    });

    const onSearchHandler = (string) => {
        const aux = string;
        if (string === ' ' || aux.trim() === ''){
            return resetToOriginalGames(dispatch);
        }

        searchByName(dispatch, string);
    }

    const onOrderHandler = (order) =>{
        
        sortByOrder(dispatch, order);
        
    }

    const onFilterHandler = (value) => {
       
        setNumPage(1);
        filterGames(dispatch, value);
        
        
    }

   

    return <div className={`${styles.cardsContainer}`}>
        <SearchBar onSearch = {onSearchHandler}
                    onOrder ={onOrderHandler}
                    onFilter = {onFilterHandler}></SearchBar>
       

        {games.length <= 0 ? <Error message = '¡No se encuentran juegos a listar!'></Error> : <>
        
            <PrintGames></PrintGames>
            <div className={`${styles.pagination}`}>
                {numPage > 1 ? <button onClick={() => {setNumPage(1)}}>│◀</button> : false}
                {numPage > 1 ?<button onClick={() => {setNumPage(numPage - 1)}}>◀</button> : false}
                {numPage < totalGames ? <button onClick={() => {setNumPage(numPage + 1)}}>▶</button> : false}
                {numPage < totalGames ? <button onClick={() => {setNumPage(totalGames)}}>▶│</button> : false}
            </div></>
        }
    </div>

    

}