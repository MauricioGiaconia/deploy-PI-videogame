import styles from './Card.module.css';
import {Link} from 'react-router-dom';

export default function Card(props){


    
    return <div className={`${styles.card}`}>
        
        <div className={`${styles.imgContainer}`}>
            <img src={props.img} alt={`${props.title}`} />
        </div>
        <h3>{props.title}</h3>
        <h4>Rating: {props.rating}</h4>
        <p>Release: {props.release.split('T')[0]}</p>

        <div className={`${styles.cardButtons}`}>
           
            <Link className={`${styles.btnMore}`} to={`/videogames/detail/${props.id}`}>ⓘ</Link>
        </div>
        
    </div>
    }