import styles from './Footer.module.css';
import linkedin from '../../img/icons/linkedIn.png';
import github from '../../img/icons/github.png';
import { Link } from 'react-router-dom';

export default function Footer(props){
    return <footer className={`${styles.contactFooter}`}>
      <div className={`${styles.contactInfo}`}>
        <h3>CONTACTO</h3>
        <ul>
          <li>Mauricio Javier Giaconía</li>
          <li>📧 Email: maurigiaconia@hotmail.com</li>
          <li>🔗 Redes:</li>
          
        </ul>
        
      </div>

      <div className={`${styles.iconContainer}`}><Link to='https://github.com/mauricioGiaconia' target="_blank" rel="noopener noreferrer"><img src={github} alt="Github profile" /></Link></div>
        <div className={`${styles.iconContainer}`}><Link to='https://linkedin.com/in/mauricio-giaconia' target="_blank" rel="noopener noreferrer"><img src={linkedin} alt="LinkedIn profile" /></Link></div>
  </footer>
}