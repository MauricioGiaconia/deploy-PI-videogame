import { Link, useLocation } from "react-router-dom"
import styles from './Nav.module.css';
import homeImg from '../../img/home.png';
import videogameImg from '../../img/videogame.png';

export default function Nag(props){


    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");

    return <nav className={`${styles.navContainer}`}>
       <ul>
            <li><Link  className={splitLocation[1] === '' ? `${styles.selected}` : ``} to='/'>HOME</Link></li>     
            <li><Link  className={splitLocation[1] === 'videogames' ? `${styles.selected}` : ``} to='/videogames'> GAMES</Link></li>    
            <li><Link  className={splitLocation[1] === 'newVideogame' ? `${styles.selected}` : ``} to='/newVideogame'> + </Link></li>    
        </ul>
    </nav>
}