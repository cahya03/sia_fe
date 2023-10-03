import DirectoryEntity from "./DirectoryEntity";
import { openFile } from "../../ipc";
export function DirectoryContents({ content, onDirectoryClick }) {
    async function onFileClick(path) {
        await openFile(path).catch(err => alert(err));
    }
    return <>
        {content.length === 0 ? "There are no files in this directory." : ""}

        {content.map((content, idx) => {
            const [fileType, [fileName, filePath]] = Object.entries(content)[0];
            return (<DirectoryEntity type={fileType} onDoubleClick={() => fileType === "Directory"
                    ? onDirectoryClick(filePath)
                    : onFileClick(filePath)} key={idx} idx={idx} name={fileName} path={filePath}/>);
        })}

    </>;
}
