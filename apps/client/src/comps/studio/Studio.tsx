import { useNavigate } from "react-router-dom";
import TopHeader from "../navigation/TopHeader";
import styles from "./Studio.module.css"
import { Button, ListItem } from "@chrome-buildin-ai-naseem/react-base-comps";
import {IWorkspace} from '@chrome-buildin-ai-naseem/interfaces';
import {workspaceEndPoint} from "@chrome-buildin-ai-naseem/endpoints";
import WorkspacesTable from "./workspaces/WorkspacesTable";
import axios from "axios";

export default function Studio() {
    // const [classToApply, setClassToApply] = useState(styles.left_pane_item);
    const navigator = useNavigate();

    function handleWorkspaceClick() {
        navigator('/studio');
    }

    async function handleCreateNewWorkspace(){        
        //POST new workspace, and update the state 
        const data:IWorkspace = { workspaceName:new Date().toISOString(), createdBy:'IAM'};
        // const config = {'Content-Type':'application/json'};
        await axios.post(workspaceEndPoint ,data)
        .then((result)=>{
            //Navigate to newly created workspace
            console.log(result);            
            navigator(`/studio/${result.data.newWorkspace._id}`);
            
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    return <>
        <TopHeader />
        <section className={styles.studio}>
            <div className={styles.left_pane}>
                <ul className={styles.left_pane_items}>
                    <ListItem onClick={handleWorkspaceClick} title="My Workspaces"></ListItem>
                </ul>
            </div>
            <div className={styles.right_pane}>
                <div className={styles.intro}>
                    <h1 className={styles.intro_heading}>Add intelligence to your business</h1>
                    <p className={styles.intro_detail}>Extract data, and process your documents without worry of tagging and training Machine Learning models</p>
                </div>
                <hr />
                <div className={styles.workspaces}>
                    <Button type="btn_medium_highlighted" title="+ New Workspace" onClick={handleCreateNewWorkspace}></Button>
                    <p className={styles.existing_workspace_heading}>Recently created</p>
                    <WorkspacesTable/>                                                                                                            
                </div>
            </div>
        </section>
    </>
}