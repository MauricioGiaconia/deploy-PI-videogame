import styles from './Options.module.css';
import formStyles from '../NewGameForm/NewGameForm.module.css';

export default function Options(props){
    return <ul className={`${formStyles.formGroup} ${styles.chckContainer}`}>
                            {props.opts.map((opt) => {
                                            return  <li key={opt.id}><label className={`${formStyles.formLabel}`} htmlFor={`${opt.name}`}><input onClick={props.onClick} name={props.name} type="checkbox" value={opt.id} />   {opt.name}  </label></li>
                                                    
                                            })}
                        </ul>
}