import { IWorkspace } from "@chrome-buildin-ai-naseem/interfaces";
import styles from "./project-bar.module.css";
import { NavigationButton } from "@chrome-buildin-ai-naseem/react-base-comps";
import { useNavigate } from "react-router-dom";


export default function ProjectBar({workspaceName}:IWorkspace){
    const navigate  = useNavigate();
    function handleBackButtonClick(){
        navigate('/studio');
    }
    return <div className={styles.project_bar}>
        <NavigationButton buttonType="back" onClick={handleBackButtonClick}/>
        {workspaceName && <p>{workspaceName}</p>}        
    </div>
}