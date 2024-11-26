import { Button, TextInput, TextInputHandle } from "@chrome-buildin-ai-naseem/react-base-comps";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState, ReactNode } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import styles from "./workspace-setting-modal.module.css";
import { workspaceEndPoint } from "@chrome-buildin-ai-naseem/endpoints";
import { IWorkspace } from "@chrome-buildin-ai-naseem/interfaces";

export interface IModalHandle {
    showModal: () => void;
    hideModal: () => void;
}

interface IModalProps {
    children: ReactNode;
    workspaceId: string;
    workspaceUpdated: (updated: boolean) => void;
}

interface CurrentWorkspaceResponse extends IWorkspace {
    _id: string;
}

export const Modal = forwardRef<IModalHandle, IModalProps>(
    ({ children, workspaceId, workspaceUpdated }, ref) => {
        const modalRef = useRef<HTMLDialogElement>(null);
        const textInputRef = useRef<TextInputHandle>(null);
        const [workspaceDetail, setWorkspaceDetail] = useState<CurrentWorkspaceResponse | null>(null);

        // Expose modal control methods
        useImperativeHandle(ref, () => ({
            showModal: () => modalRef.current?.showModal(),
            hideModal: () => modalRef.current?.close(),
        }));

        // Fetch workspace details whenever workspaceId changes
        useEffect(() => {
            const fetchWorkspaceDetail = async () => {
                try {
                    const response = await axios.get<CurrentWorkspaceResponse>(
                        `${workspaceEndPoint}/${workspaceId}`
                    );
                    setWorkspaceDetail(response.data);
                } catch (error) {
                    console.error("Error fetching workspace details:", error);
                }
            };

            fetchWorkspaceDetail();

            // Close modal on 'Escape' key press
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === "Escape") modalRef.current?.close();
            };

            window.addEventListener("keydown", handleKeyDown);
            return () => {
                window.removeEventListener("keydown", handleKeyDown);
            };
        }, [workspaceId]);

        // Save changes to the workspace
        const handleSaveClick = async () => {
            if (!textInputRef.current) return;

            try {
                const updatedName = textInputRef.current.getValue();
                const response = await axios.patch<CurrentWorkspaceResponse>(
                    `${workspaceEndPoint}/${workspaceId}`,
                    { workspaceName: updatedName }
                );

                // setWorkspaceDetail(response.data);
                workspaceUpdated(true); // Notify parent about update
                modalRef.current?.close(); // Close the modal after saving
            } catch (error) {
                console.error("Error updating workspace:", error);
            }
        };

        return createPortal(
            <dialog ref={modalRef} className={styles.container}>
                <div className={styles.content}>
                    <p>{`Workspace ID: ${workspaceDetail?._id}`}</p>
                    <div>
                        <label htmlFor="workspace-name">Workspace Name</label>
                        {workspaceDetail!==null && (
                            <TextInput key={workspaceDetail._id} ref={textInputRef} initValue={workspaceDetail.workspaceName} />
                        )}
                    </div>
                    <form method="dialog">
                        <Button title="Save" type="btn_small_highlighted" onClick={handleSaveClick} />
                    </form>
                </div>
            </dialog>,
            document.getElementById("modal-root")!
        );
    }
);
