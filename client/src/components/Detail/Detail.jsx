import { useEffect } from "react";
import { getGame } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate} from "react-router-dom";
import Loading from '../Loading/Loading.jsx';
import styles from './Detail.module.css';

export default function Detail(props){

    const gameDetail = useSelector((state) => state.gameById);
    const dispatch = useDispatch();
    const navigate = useNavigate(-1);
    const {id} = useParams();

    useEffect(() =>{

        if (isNaN(id)){
            dispatch(getGame(id, true));
        } else{
            dispatch(getGame(id, false));
        }

    }, []);

    function deleteTags(textWithTags){
        const div = document.createElement('div');
        div.innerHTML = textWithTags;
    
        const textWithoutTags = div.innerText;
        return <div>{textWithoutTags}</div>
    }

    if (gameDetail.length <= 0){
        return <div className={`${styles.detailContainer}`}><Loading></Loading></div>
    }

    return <div className={`${styles.detailContainer}`}>
        <div className={`${styles.imgContainer}`}>
            <img src={gameDetail.background_image ? gameDetail.background_image : gameDetail.img} alt={gameDetail.name} />
            {gameDetail.background_image_additional ? <img src={gameDetail.background_image_additional} alt={gameDetail.name}/> : false}
            {gameDetail.aditionalImg ? <img src={gameDetail.aditionalImg} alt={gameDetail.name}/> : false}
        </div>
        <h2>{gameDetail.name}</h2>
        <p>Rating: {gameDetail.rating}</p>
        <p>Lanzamiento: {gameDetail.released.split('T')[0]}</p>
  

        <div className={`${styles.listsContainer}`}>

            <div>
                <h3>Generos </h3>
                <ul>
                    {gameDetail.genres.map((genre, index) => <li key={index}>{genre.name}</li>)}
                </ul>
            </div>

            <div>
                <h3>Plataformas </h3>
                <ul> {gameDetail.platforms.map((platform, index) => {
                        if (isNaN(id)){
                            return  <li key={index}>{platform.name}</li>
                        }
                        return <li key={index}>{platform.platform.name}</li>
                    })}
                
                </ul>        
            </div>
            <div>
                <h3>Stores </h3>
                <ul> {gameDetail.stores.map((store, index) => {
                        if (isNaN(id)){
                            return  <li key={index}>{store.name}</li>
                        }
                        return <li key={index}>{store.store.name}</li>
                    })}
                
                </ul>   
            </div>

            
        </div>

        <div className={`${styles.descriptionContainer}`}>
            <h3>Descripción: </h3>
            <p>{deleteTags(gameDetail.description)}</p>
        </div>

        <button onClick = {() => navigate(-1)}>VOLVER</button>
    </div>
}