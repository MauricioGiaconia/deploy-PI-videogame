import styles from './Error.module.css';
import joystick from '../../img/videogame.png'

export default function Error(props){

    return <div className={`${styles.errorContainer}`}>
        <img src={joystick} alt="Error!" />
        <h2>{props.message}</h2>
    </div>
}