import { useSelector, useDispatch } from 'react-redux';
import styles from './NewGameForm.module.css';
import { useState, useEffect } from 'react';
import { getGenres, getPlatforms, getDevelopers, getStores, postNewGame } from '../../redux/actions';
import Loading from '../Loading/Loading';
import Options from '../Options/Options';
import Stars from '../Stars/Stars.jsx';
import { getGames } from '../../redux/actions';


export default function NewGameForm(props){

    const fechaActual = new Date().toISOString().split("T")[0];
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);
    const platforms = useSelector((state) => state.platforms);
    const developers = useSelector((state) => state.developers);
    const stores = useSelector((state) => state.stores);
    const error = useSelector((state) => state.error );
    const [loading, isLoading] = useState(true);
    const [submit, setSubmit] = useState(false);
    const [newGame, setNewGame] = useState({
        title : '',
        description : '',
        release : '',
        img : '',
        aditionalImg : null,
        rating : 0,
        genres : [],
        platforms : [],
        stores : [],
        developer : 0
    });
    const [ratingVal, setRatingVal] = useState(false)
    const [validations, setValidations] = useState({
        title : false,
        description : false,
        release : false,
        img : false,
        aditionalImg : false,
        rating : false,
        genres : false,
        platforms : false,
        stores : false,
        developer : false

    });

    useEffect(() => {

        if (genres.length <= 0 || platforms.length <= 0 || developers.length <= 0 || stores.length <= 0){
            dispatch(getGenres());
            dispatch(getPlatforms());
            dispatch(getDevelopers());
            dispatch(getStores());
        } else{
            isLoading(false);
        }

    }, [genres, platforms, developers, stores, error]);



    if (loading){
        return <>
            <Loading></Loading>;
        </>
    }

    const onSubmit = (e) =>{

        e.preventDefault();
        

        if (newGame.aditionalImg && !validations.aditionalImg){
            return;
        }

        if (newGame.title && newGame.description && newGame.release && validations.img && newGame.rating && newGame.genres.length > 0 && newGame.platforms.length > 0 && newGame.developer && newGame.stores.length > 0){

            dispatch(postNewGame(newGame)).then(()=>{dispatch(getGames())});
            setSubmit(true);
            e.target.reset();

            setValidations({
                title : false,
                description : false,
                release : false,
                img : false,
                aditionalImg : false,
                genres : false,
                platforms : false,
                stores : false,
                developer : false
        
            });

            setNewGame({
                title : '',
                description : '',
                release : '',
                img : '',
                aditionalImg : null,
                rating : 0,
                genres : [],
                platforms : [],
                stores : [],
                developer : 0
            });
        }
     
    }

    const onCheckboxHandler = (e) => {

        const auxVal = {...validations};
        if (e.target.checked){

            setNewGame({...newGame, ...newGame[e.target.name].push(e.target.value)})

            auxVal[e.target.name] = true;
        } else{
            
            const auxGame = {...newGame};
            auxGame[e.target.name] = newGame[e.target.name].filter((value) => value !== e.target.value);
            setNewGame(auxGame);

            auxVal[e.target.name] = false;
        } 
        
        setValidations(auxVal);
    }

    const onSelectHandler = (e) => {

        if (e.target.value !== null && e.target.value !== '-- OPCIONES --'){
            setNewGame({...newGame, developer : e.target.value});
            setValidations({...validations, developer : true});
        } else{
            setNewGame({...newGame, developer : null});
            setValidations({...validations, developer : false});
        }
    }

    const onChangeHandler = (e) =>{

        const auxVal = {...validations};
        const auxNewG = {...newGame};

        if (e.target.value){
            auxNewG[e.target.name] = e.target.value;
            auxVal[e.target.name] = true;
        } else{
            auxVal[e.target.name] = false;
        }

        setValidations(auxVal);
        setNewGame(auxNewG);

    }

    const onStarHandler = (value) => {

        if (!value){
            setRatingVal(false);
            setNewGame({...newGame, rating: 0});
            return;
        }
        
        setNewGame({...newGame, rating: value});
        setRatingVal(true);
    }

    const handleImgChange = (e) =>{
        const file = e.target.files[0];
        const reader = new FileReader();
        const tag = e.target.name;
        const auxVal = {...validations};

        if (file && file.type.startsWith('image/')){
            reader.onload = (e) => {

                const auxNew = {...newGame};
    
                auxNew[tag] = e.target.result;
                setNewGame(auxNew);
            };
       
            reader.readAsDataURL(file);

            auxVal[e.target.name] = true;
        } else{
            auxVal[e.target.name] = false;
        }
       
        setValidations(auxVal);
     
    }


 
    return <div className={`${styles.formContainer}`}>
        <form action='' onSubmit={onSubmit}>
           
            <div className={`${styles.formGroup}`}>
                <label className={`${styles.formLabel}`}  htmlFor="ngameTitle">Titulo del juego: </label>
                <input onChange={onChangeHandler} className={`${styles.formInput}`} name='title' type="text"/>
                <div className={`${styles.formMessage}`}>
                    {!validations.title  ? <p className={`${styles.formError}`}>¡El titulo no puede estar vacio!</p> : false}
                 </div>
            </div> <br />

            

            <div className={`${styles.formGroup}`}>
                <label className={`${styles.formLabel}`} htmlFor="description">Descripción: </label>
                <textarea onChange={onChangeHandler} className={`${styles.formInput}`} name="description" id="gameDescription" cols="30" rows="10"></textarea>
                <div className={`${styles.formMessage}`}>
                    {!validations.description  ? <p className={`${styles.formError}`}>¡La descripcion no puede estar vacia!</p> : false}
                 </div>
            </div> <br />
    
            <div className={`${styles.formGroup}`}>
                <label className={`${styles.formLabel}`} htmlFor="release">Fecha de lanzamiento: </label>
                <input onChange={onChangeHandler} className={`${styles.formInput}`} name='release' type='date'  min='1952-10-18' max={fechaActual}/>
                <div className={`${styles.formMessage}`}>
                    {!validations.release  ? <p className={`${styles.formError}`}>¡Selecciona una fecha de lanzamiento!</p> : false}
                 </div>
            </div> <br />

            <div className={`${styles.formGroup}`}>
                <label className={`${styles.formLabel}`} htmlFor="img">Imagen: </label>
                <input onChange={handleImgChange} name='img' className={`${styles.formInput}`} type="file"/>
                <div className={`${styles.formMessage}`}>
                    {!validations.img  ? <p className={`${styles.formError}`}>¡Selecciona una imagen (JPG, PNG, JPEG, GIF)!</p> : false}
                 </div>
            </div> <br />

            <div className={`${styles.formGroup}`}>
                <label className={`${styles.formLabel}`} htmlFor="optionalImg">Imagen adicional (opcional): </label>
                <input onChange={handleImgChange} name='aditionalImg' className={`${styles.formInput}`} type="file"/> 
                <div className={`${styles.formMessage}`}>
                    {!validations.aditionalImg && newGame.aditionalImg  ? <p className={`${styles.formError}`}>¡Selecciona una imagen valida (JPG, PNG, JPEG, GIF)!</p> : false}
                 </div>
            </div> <br />

            <div className={`${styles.formGroup}`}>
                <label className={`${styles.formLabel}`} htmlFor="rating">Rating: </label>    
                <Stars numStars = '5'
                        onClick={onStarHandler}></Stars>
                <div className={`${styles.formMessage}`}>
                    {!ratingVal ? <p className={`${styles.formError}`}>¡Selecciona un puntaje!</p> : false}
                 </div>
            </div>     

            <div className={`${styles.formGroup}`}>
                <label className={`${styles.formLabel}`} htmlFor="genres">Generos: </label>
                
                <Options opts={genres}
                        name='genres'
                        onClick={onCheckboxHandler}></Options>    
                    
                <div className={`${styles.formMessage}`}>
                    {!validations.genres  ? <p className={`${styles.formError}`}>¡Selecciona minimo un genero!</p> : false}
                 </div>
            </div> 


            <div className={`${styles.formGroup}`}>
                <label className={`${styles.formLabel}`} htmlFor="platforms">Plataformas: </label>
                
                <Options opts={platforms}
                        name='platforms'
                        onClick={onCheckboxHandler}></Options>    
                    
                <div className={`${styles.formMessage}`}>
                    {!validations.platforms  ? <p className={`${styles.formError}`}>¡Selecciona minimo una plataforma!</p> : false}
                 </div>
            </div> 

            <div className={`${styles.formGroup}`}>
                <label className={`${styles.formLabel}`} htmlFor="platforms">Desarrollador/a: </label>
                
                <select onChange={onSelectHandler} className={`${styles.formSelect}`} name="developer" id="selectDev">
                    <option value={null}> -- OPCIONES -- </option>
                    {developers.map((dev) => <option key={dev.id} value={dev.id}>{dev.name}</option>)}
                </select>
                    
                <div className={`${styles.formMessage}`}>
                    {!validations.developer ? <p className={`${styles.formError}`}>¡Selecciona un desarrollador!</p> : false}
                 </div>
            </div> 

            <div className={`${styles.formGroup}`}>
                <label className={`${styles.formLabel}`} htmlFor="stores">Tiendas: </label>
                
                <Options opts={stores}
                        name='stores'
                        onClick={onCheckboxHandler}></Options>    
                    
                <div className={`${styles.formMessage}`}>
                    {!validations.stores !== ''  ? <p className={`${styles.formError}`}>¡Selecciona minimo una tienda!</p> : false}
                 </div>
            </div> 


            <button className={`${styles.formSubmit}`}>CREAR</button>
                
            <div className={`${styles.formMessage}`}>
                {error.error !== '' && submit ? <p className={`${styles.formError}`}>{error.message}</p> : false}
                {error.error === '' && submit ? <p className={`${styles.formSuccess}`}>Juego cargado con exito!</p> : false}    
            </div>
        </form>
    </div>
}