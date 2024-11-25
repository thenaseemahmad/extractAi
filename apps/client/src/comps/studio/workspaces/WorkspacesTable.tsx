import { useNavigate } from "react-router-dom";
import styles from "./WorkspacesTable.module.css";
import { useEffect, useState } from "react";
import { IWorkspace } from "@chrome-buildin-ai-naseem/interfaces";
import axios from "axios";
import { workspaceEndPoint } from "@chrome-buildin-ai-naseem/endpoints";
import { SettingIconButton } from "@chrome-buildin-ai-naseem/react-base-comps";

interface workspaceWithId extends IWorkspace {
    _id: string;
}
export default function WorkspacesTable() {
    const [workspaces, setWorkspaces] = useState<workspaceWithId[]>([]);

    const navigator = useNavigate();

    useEffect(() => {
        async function fetchWorkspaces() {
            await axios.get<workspaceWithId[]>(workspaceEndPoint)
                .then((response) => {
                    setWorkspaces(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        fetchWorkspaces();
    }, []);


    function handleWorkspaceSelect(selectedWorkspadeId: string) {
        navigator(`/studio/${selectedWorkspadeId}`)
    }

    function handleSettingIconClick(workspaceId:string){
        console.log("Setting of ", workspaceId, "clicked");
    }

    return <div className={styles.workspaces_main}>
        <table className={styles.workspaces}>
            <thead>
                <tr className={styles.row}>
                    <th className={styles.cell}>Name</th>
                    <th>Owner</th>
                    <th>Created on</th>
                    <th>Setting</th>
                </tr>
            </thead>
            <tbody>
                {workspaces.map((workspace) => (
                    <tr className={styles.row}>
                        <td><span onClick={() => { handleWorkspaceSelect(workspace._id) }}>{workspace.workspaceName}</span></td>
                        <td>{workspace.createdBy}</td>
                        <td>{workspace.createdOn}</td>
                        <td><SettingIconButton onClick={()=>handleSettingIconClick(workspace._id.toString())}/></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}