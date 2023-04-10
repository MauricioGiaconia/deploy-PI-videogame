import styles from './Loading.module.css';
import joystick from '../../img/videogame.png';

export default function(props){
    return <div className={`${styles.loadingContainer}`}>
        <img src={joystick} alt='Loading...' />
    </div>
}