import { useSelector } from 'react-redux';
import styles from './SearchBar.module.css';

// PARA FILTRAR POR JUEGOS DE LA API O DB PUEDO VERIFICAR SI EL ID ES NaN O NO!!!!!

export default function SearchBar(props){
    const genres = useSelector(state => state.genres);

    return <div className={`${styles.searchBarContainer}`}>
        <input onChange={(e) =>{props.onSearch(e.target.value)}} type="search" name="searchGame"/>  

        <select onChange={(e) => {props.onOrder(e.target.value)}} name="orderGames">
            <option value='origin'>-- ORDEN --</option>
            <option value="DESC">A-Z</option>
            <option value="ASC">Z-A</option>
            <option value="HIGH">Mas valorado</option> 
            <option value="LOW">Menos valorado</option>     
        </select> 
        
        <select onChange={(e) => {props.onFilter(e.target.value)}} name="selectGenre">
            <option value="all">-- TODOS --</option>
            {genres.map((genre) => <option key={genre.id} value={genre.name}>{genre.name}</option>)}
            <option value='db'>Database</option>
            <option value='api'>API</option>
        </select>
    </div> 
}