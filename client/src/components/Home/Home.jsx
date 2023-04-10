import styles from './Home.module.css';
import headerPC from '../../img/retropc.png';
import piVideogamesHome from '../../img/piVideogamesHome.png';
import News from '../News/News';

export default function Home(props){

    return <div className={`${styles.homeContainer}`}>
        <div className={`${styles.banner}`}>

            <div className={`${styles.bannerContent}`}>
                <div className={`${styles.logoContainer}`}>
                    <img src={piVideogamesHome} alt="logo" />
                </div>
                <div className={`${styles.pcContainer}`}>
                    <img src={headerPC} alt="retro pc" />
                </div>
            </div>

            

           
          
            
           
       
        </div>

        <div className={`${styles.columnas}`}>
            <News></News>
            <News></News>
            <News></News>
        </div>
       
    </div>
}