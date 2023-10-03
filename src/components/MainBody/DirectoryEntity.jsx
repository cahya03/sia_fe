import { useRef } from "react";
import { ContextMenuType } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { updateContextMenu } from "../../state/slices/contextMenuSlice";
import { selectContentIdx, selectCurrentSelectedContentIdx, unselectDirectoryContents } from "../../state/slices/currentDirectorySlice";
export const DIRECTORY_ENTITY_ID = "directory-entity";
export default function DirectoryEntity({ idx, name, path, type, onDoubleClick }) {
    const buttonRef = useRef(null);
    const dispatch = useAppDispatch();
    const selectedContentIdx = useAppSelector(selectCurrentSelectedContentIdx);
    function handleContextMenu(e) {
        e.preventDefault();
        dispatch(updateContextMenu({
            currentContextMenu: ContextMenuType.DirectoryEntity,
            mouseX: e.pageX,
            mouseY: e.pageY,
            contextMenuPayload: { fileName: name, filePath: path, type },
        }));
    }
    return (<div title={name} className="overflow-ellipsis whitespace-nowrap overflow-hidden">
            <button id={DIRECTORY_ENTITY_ID} onContextMenu={handleContextMenu} className={`directory-entity bg-background hover:bg-bright cursor-pointer w-full h-7 flex ${selectedContentIdx === idx ? "bg-bright" : ""}`} onDoubleClick={(e) => {
            onDoubleClick(e);
            dispatch(unselectDirectoryContents());
        }} onClick={() => dispatch(selectContentIdx(idx))} ref={buttonRef}>
                <div className="mr-1 ml-1">
                    <FontAwesomeIcon icon={type == "File" ? faFile : faFolder} size="lg" color={type == "File" ? "gray" : "#FFD54F"}/>
                </div>
                {name}
            </button>
        </div>);
}
