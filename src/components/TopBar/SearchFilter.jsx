import Input, { InputSize } from "../../ui/Input";
export default function SearchFilter({ filters, setFilters }) {
    function onAcceptFilesChange(e) {
        if (!e.target.checked && !filters.acceptDirectories) {
            setFilters({
                ...filters,
                acceptFiles: false,
                acceptDirectories: true,
            });
            return;
        }
        setFilters({
            ...filters,
            acceptFiles: e.target.checked,
        });
    }
    function onAcceptDirsChange(e) {
        if (!e.target.checked && !filters.acceptFiles) {
            setFilters({
                ...filters,
                acceptDirectories: false,
                acceptFiles: true,
            });
            return;
        }
        setFilters({
            ...filters,
            acceptDirectories: e.target.checked,
        });
    }
    function onExtensionChange(e) {
        setFilters({
            ...filters,
            extension: e.target.value,
        });
    }
    return (<div className="space-x-2 flex justify-center bg-darker p-4 rounded-bl-lg rounded-br-lg w-62">
            <div className="flex flex-col space-y-2">
                <label>Extension</label>
                <label>Files</label>
                <label>Folders</label>
            </div>

            <div className="flex flex-col space-y-2 relative">
                <Input onChange={onExtensionChange} value={filters.extension} placeholder="ext" size={InputSize.Tiny} disabled={!filters.acceptFiles}/>
                <input checked={filters.acceptFiles} onChange={onAcceptFilesChange} className="absolute left-2 top-8" type="checkbox"/>
                <input checked={filters.acceptDirectories} onChange={onAcceptDirsChange} className="absolute left-2 top-16" type="checkbox"/>
            </div>
        </div>);
}
