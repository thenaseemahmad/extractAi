import { useNavigate } from 'react-router-dom';
import styles from './TopHeader.module.css';

export default function TopHeader(){
    const navigator = useNavigate();

    return <header className={styles.top_navigation}>
        <h3 onClick={()=>{navigator('/')}} className={styles.logo}>extractAi</h3>
    </header>
}