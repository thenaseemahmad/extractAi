import { useParams } from "react-router-dom"
import TopHeader from "../../../navigation/TopHeader";
import styles from "./workspace.module.css";
import FileUpload from "../../../file-upload/FileUpload";
import { Button, TextInput, TextInputHandle, ImageRender, TextArea } from "@chrome-buildin-ai-naseem/react-base-comps";
import { useEffect, useRef, useState } from "react";
import axios, { Axios, AxiosResponse } from "axios";
import ProjectBar from "../../../navigation/project-bar";
import { entitiesEndPoint, ocrEndPoint, workspaceEndPoint } from "@chrome-buildin-ai-naseem/endpoints";
import { IEntities, IWorkspace } from "@chrome-buildin-ai-naseem/interfaces";
import { getResponseFromPromptApi } from "@chrome-buildin-ai-naseem/chrome-buildin-ai-api";
import LoadingBarComponent from "../../../loading-bar/loading-bar";


interface IWorkspacesResponse extends IWorkspace {
    _id: string;
}

interface IEntitiesResponse extends IEntities {
    _id: string;
}

export default function Workspace() {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const newEntityInputRef = useRef<TextInputHandle>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [entities, setEntities] = useState<IEntitiesResponse[]>([]);
    const [currentWorkspace, setCurrentWorkspace] = useState<IWorkspacesResponse>();
    const [extractedData, setExtractedData] = useState<any>({});
    const [fileSelected, setFileSelected] = useState(false);

    //get detail of selected workspace from mongodb
    useEffect(() => {
        async function fetchData() {
            try {
                const [workspaceResponse, entititesResponse] = await Promise.all([
                    axios.get(`${workspaceEndPoint}/${workspaceId}`),
                    axios.get(`${entitiesEndPoint}/${workspaceId}`)
                ]);
                setCurrentWorkspace(workspaceResponse.data);
                setEntities(entititesResponse.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [workspaceId]);

    async function handleOnFileSelect(file: File | null) {
        // setSelectedFile(file);
        if (file !== null) {
            setFileSelected(true);
            const formData = new FormData();
            formData.append('image', file);
            try {
                const response = await axios.post(`${ocrEndPoint}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                if (entities.length > 0) {
                    getResponseFromPromptApi(`Extract ${entities.map(entity => entity.entityName).join(', ')} from this text in key:value form, ${response.data.extractedText}`)
                        .then((promptResponse) => {
                            console.log(promptResponse);
                            // const jsonString = promptResponse.replace(/^```json|```$/g, '').trim();
                            // console.log(JSON.parse(jsonString));
                            // setExtractedData(JSON.parse(jsonString));
                            console.log(promptResponse)
                            setExtractedData(promptResponse)

                        })
                        .catch((error) => {
                            console.log("Error: ", error);
                        });
                } else {
                    console.log("No entity supplied")
                }
            }
            catch (error) {
                console.log("Error uploading image to backend", error);
            }
            setPreviewUrl(URL.createObjectURL(file));
        }
        else {
            setFileSelected(false);
            setPreviewUrl(null);
        }
    }

    async function handleAddNewEntity() {
        if (newEntityInputRef.current) {
            const value = newEntityInputRef.current.getValue();
            await axios.post<IEntitiesResponse, AxiosResponse<IEntitiesResponse>, IEntities>(entitiesEndPoint, { entityName: value, workspaceId: workspaceId ?? '' })
                .then((response) => {
                    newEntityInputRef.current?.resetValue();
                    setEntities(prevVal => [response.data, ...prevVal]);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }


    return <>
        <TopHeader />
        <ProjectBar workspaceName={currentWorkspace ? currentWorkspace?.workspaceName : ""} />
        <div className={styles.workspace}>
            <div className={styles.leftpane}>
                <FileUpload onFileSelect={handleOnFileSelect} />
                <hr />
                {previewUrl && <ImageRender src={previewUrl} alt="Selected image" />}
            </div>
            <div className={styles.rightpane}>
                <div className={styles.new_entity}>
                    <TextInput ref={newEntityInputRef} placeholder="Add a new entity" initValue="" />
                    <Button title="Add" type="btn_small_highlighted" onClick={handleAddNewEntity} />
                </div>
                <hr />
                <h5>Entities</h5>
                <div className={styles.entities}>
                    {Object.keys(extractedData).length === 0 && fileSelected===true ? <>
                        <LoadingBarComponent show />
                        {entities.map((entity) => {
                            return (<div key={entity._id}>
                                <h6>{entity.entityName}</h6>
                                <TextArea initValue={extractedData[entity.entityName] === null ? "Not specified in supplied document" : extractedData[entity.entityName] === undefined ? "" : extractedData[entity.entityName]} />
                            </div>);
                        })}
                    </> :
                        entities.map((entity) => {
                            return (<div key={entity._id}>
                                <h6>{entity.entityName}</h6>
                                <TextArea initValue={extractedData[entity.entityName] === null ? "Not specified in supplied document" : extractedData[entity.entityName] === undefined ? "" : extractedData[entity.entityName]} />
                            </div>);
                        })}

                </div>
            </div>
        </div>
    </>
}