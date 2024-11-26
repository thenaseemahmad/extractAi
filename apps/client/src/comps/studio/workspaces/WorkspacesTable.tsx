import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import styles from "./WorkspacesTable.module.css";
import { SettingIconButton } from "@chrome-buildin-ai-naseem/react-base-comps";
import { Modal, IModalHandle } from "./workspace/workspace-setting-modal";
import { workspaceEndPoint } from "@chrome-buildin-ai-naseem/endpoints";
import { IWorkspace } from "@chrome-buildin-ai-naseem/interfaces";

interface WorkspaceWithId extends IWorkspace {
    _id: string;
}

export default function WorkspacesTable() {
    const [workspaces, setWorkspaces] = useState<WorkspaceWithId[]>([]);
    const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string | null>(null);
    const [workspaceUpdated, setWorkspaceUpdated] = useState(false);
    const navigate = useNavigate();
    const modalRef = useRef<IModalHandle>(null);

    
    useEffect(() => {
        const fetchWorkspaces = async () => {
            try {
                const response = await axios.get<WorkspaceWithId[]>(workspaceEndPoint);
                setWorkspaces(response.data);
            } catch (error) {
                console.error("Error fetching workspaces:", error);
            }
        };

        fetchWorkspaces();
    }, [workspaceUpdated]);

    const handleWorkspaceSelect = (workspaceId: string) => {
        navigate(`/studio/${workspaceId}`);
    };

    const handleSettingIconClick = (workspaceId: string) => {        
        setSelectedWorkspaceId(workspaceId);
        setTimeout(() => {
            modalRef.current?.showModal();
        }, 0);
    };

    return (<>
        <div className={styles.workspaces_main}>
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
                        <tr key={workspace._id} className={styles.row}>
                            <td>
                                <span onClick={() => handleWorkspaceSelect(workspace._id)}>
                                    {workspace.workspaceName}
                                </span>
                            </td>
                            <td>{workspace.createdBy}</td>
                            <td>{workspace.createdOn}</td>
                            <td>
                                <SettingIconButton onClick={() => handleSettingIconClick(workspace._id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {selectedWorkspaceId !== null && (
            <Modal
                ref={modalRef}
                workspaceId={selectedWorkspaceId}
                workspaceUpdated={(updated) => setWorkspaceUpdated(updated)}
            >
                <h3>Workspace Settings</h3>
            </Modal>
        )}
    </>
    );
}
