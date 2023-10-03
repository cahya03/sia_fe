import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import axios from "axios";
import SearchFilter from "./SearchFilter";
import Input, { InputSize } from "../../ui/Input";
export default function SearchBar({ currentDirectoryPath, currentVolume, setSearchResults, }) {
    const [searchValue, setSearchValue] = useState("");
    const [searchFilter, setSearchFilter] = useState({
        extension: "",
        acceptFiles: true,
        acceptDirectories: true,
    });
    const [currentPlace, setCurrentPlace] = useState();
    useEffect(() => {
        const split = currentDirectoryPath.split("\\");
        setCurrentPlace(split[split.length - 2]);
    }, [currentDirectoryPath]);
    async function onSearch() {
        if (currentVolume.length == 0) {
            alert("Please select a volume before searching.");
            return;
        }
        try {
            const response = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/search`,
              {
                "query": searchValue,
                "search_directory": currentDirectoryPath,
                "mount_pnt": currentVolume,
                "extension": searchFilter.extension,
                "accept_files": searchFilter.acceptFiles,
                "accept_directories": searchFilter.acceptDirectories,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                },
              }
            );
            setSearchResults(response.data);
          } catch (error) {
            return []
          }
        
        
        
    }
    return (<div className="absolute right-4 top-13">
      <Input value={searchValue} setValue={setSearchValue} placeholder={`Search ${currentPlace || "PC"}`} className="rounded-bl-none rounded-br-none" onSubmit={onSearch} size={InputSize.Large}/>
      <SearchFilter filters={searchFilter} setFilters={setSearchFilter}/>
    </div>);
}
