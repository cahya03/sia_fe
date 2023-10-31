import { ContextMenuType } from "../../types";
import ContextMenu from "./ContextMenu";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import InputModal from "../InputModal";
import { useState } from "react";
import fileDownload from 'js-file-download'
//import { confirm } from "@tauri-apps/api/dialog";
import { useJwt } from "../../context/JwtContext";
import { createFile, createDirectory, deleteFile, renameFile, downloadFile, uploadFile } from "../../ipc";
import { addContent, deleteContent, renameContent, selectContentIdx } from "../../state/slices/currentDirectorySlice";
import { createDirectoryContent, removeFileNameFromPath } from "../../util";
export default function ContextMenus() {
    const { jwt } = useJwt();
    const { currentContextMenu, contextMenuPayload } = useAppSelector(state => state.contextMenu);
    const [newFileShown, setNewFileShown] = useState(false);
    const [newDirectoryShown, setNewDirectoryShown] = useState(false);
    const [renameFileShown, setRenameFileShown] = useState(false);
    // Typescript pain
    const directoryEntityPayload = contextMenuPayload;
    const generalPayload = contextMenuPayload;
    const dispatch = useAppDispatch();
    async function onNewFile(name) {
        try {
            const path = generalPayload.currentPath + "\\" + name;
            if (await createFile(path, jwt.jwt) == "success") {
                const newDirectoryContent = createDirectoryContent("File", name, path);
                dispatch(addContent(newDirectoryContent));
                dispatch(selectContentIdx(0)); // Select top item as content is added to the top.
            } else {
                alert("Invalid Authority")
            }
        }
        catch (e) {
            alert(e);
        }
    }
    async function onNewFolder(name) {
        try {
            const path = generalPayload.currentPath + "\\" + name;
            if (await createDirectory(path, jwt.jwt) == "success") {
                const newDirectoryContent = createDirectoryContent("Directory", name, path);
                dispatch(addContent(newDirectoryContent));
                dispatch(selectContentIdx(0)); // Select top item as content is added to the top.
            } else {
                alert("Invalid Authority")
            }
        }
        catch (e) {
            alert(e);
        }
    }
    async function onRename(newName) {
        try {
            const path = removeFileNameFromPath(directoryEntityPayload.filePath);
            const oldPath = path + "\\" + directoryEntityPayload.fileName;
            const newPath = path + "\\" + newName;

            if (await renameFile(oldPath, newPath, jwt.jwt) == "success") {
                const oldContent = createDirectoryContent(directoryEntityPayload.type, directoryEntityPayload.fileName, oldPath);
                const newContent = createDirectoryContent(directoryEntityPayload.type, newName, newPath);
                dispatch(renameContent([oldContent, newContent]));
                dispatch(selectContentIdx(0)); // Select top item as content is added to the top.
            } else {
                alert("Invalid Authority")
            }

        }
        catch (e) {
            alert(e);
        }
    }
    async function onDelete() {
        try {
            if (await deleteFile(directoryEntityPayload.type, directoryEntityPayload.filePath, jwt.jwt) == "success") {
                const content = createDirectoryContent(directoryEntityPayload.type, directoryEntityPayload.fileName, directoryEntityPayload.filePath);
                dispatch(deleteContent(content));
            } else {
                alert("Invalid Authority")
            }
        }
        catch (e) {
            alert(e);
        }
    }
    async function onUploadFile() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.style.display = 'none';
        // Add an event listener to handle the file selection
        fileInput.addEventListener('change', async (event) => {

            const selectedFile = event.target.files[0];
            if (selectedFile) {
                // Handle the selected file here, for example, upload it to the server
                const cleanedPath = generalPayload.currentPath.replace(/\\/g, '/')
                await uploadFile(cleanedPath, selectedFile, jwt.jwt);
                const path = generalPayload.currentPath + "\\" + selectedFile.name;
                const newDirectoryContent = createDirectoryContent("File", selectedFile.name, path);
                dispatch(addContent(newDirectoryContent));
                dispatch(selectContentIdx(0)); // Select top item as content is added to the top.
            }
            // Remove the input element from the DOM
            document.body.removeChild(fileInput);
        });
        // Trigger a click event to open the file dialog
        fileInput.click();
        // Append the input element to the DOM
        document.body.appendChild(fileInput);
    }
    async function onDownloadFile() {
        try {
            const content = await downloadFile(directoryEntityPayload.filePath, jwt.jwt);
          
            if (content instanceof Blob) {
                fileDownload(content, directoryEntityPayload.fileName)
            } else if (content.response.status == "501") {
                alert("Can't download folder")
            } else if (content.response.status == "400") {
                alert("Invalid Authority")
            }
        } catch (e) {
            alert(e);
        }
    }
    return (<>
        {currentContextMenu == ContextMenuType.General ? (<ContextMenu options={[
            { name: "New File", onClick: () => setNewFileShown(true) },
            { name: "New Folder", onClick: () => setNewDirectoryShown(true) },
            { name: "Upload File", onClick: () => onUploadFile() }
        ]} />) : currentContextMenu == ContextMenuType.DirectoryEntity ? (<ContextMenu options={[
            { name: "Rename", onClick: () => setRenameFileShown(true) },
            { name: "Delete", onClick: async () => onDelete() },
            { name: "Download File", onClick: async () => onDownloadFile() }
        ]} />) : ""}

        <InputModal shown={newFileShown} setShown={setNewFileShown} title="New File" onSubmit={onNewFile} submitName="Create" />
        <InputModal shown={newDirectoryShown} setShown={setNewDirectoryShown} title="New Folder" onSubmit={onNewFolder} submitName="Create" />
        <InputModal shown={renameFileShown} setShown={setRenameFileShown} title="Rename File" onSubmit={onRename} submitName="Rename" />
    </>);
}
