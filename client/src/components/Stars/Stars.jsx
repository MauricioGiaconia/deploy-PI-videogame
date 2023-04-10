import React from 'react';
import { useState } from 'react';
import styles from './Stars.module.css';


export default function Stars(props){

    const [clicked, setClicked] = useState('');

    const onStarClick = (value) => {
        
        setClicked(value);

        if (props.onClick){
            props.onClick(value);
        }
    }

    const GenerateSpans = () =>{

        let spans = [];

        for (let i = 1; i<=parseInt(props.numStars); i++){
           spans.push(<span key={i} onClick={() => {onStarClick(i)}} id={`star${i}`} className={clicked >= i ? `${styles.starSelected} ${styles.star} ` : `${styles.star}`} value={i}>★</span>);
        }

        return spans;
    }

    return <div>
        <GenerateSpans></GenerateSpans>
    </div>
}