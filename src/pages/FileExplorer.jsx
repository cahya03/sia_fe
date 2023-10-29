import { useEffect, useState } from "react";
import { openDirectory } from "../ipc";
import VolumeList from "../components/MainBody/Volumes/VolumeList";
import FolderNavigation from "../components/TopBar/FolderNavigation";
import { DirectoryContents } from "../components/MainBody/DirectoryContents";
import useNavigation from "../hooks/useNavigation";
import SearchBar from "../components/TopBar/SearchBar";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import useContextMenu from "../hooks/useContextMenu";
import ContextMenus from "../components/ContextMenus/ContextMenus";
import { selectDirectoryContents, unselectDirectoryContents, updateDirectoryContents } from "../state/slices/currentDirectorySlice";
import { DIRECTORY_ENTITY_ID } from "../components/MainBody/DirectoryEntity";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { useNavigate } from "react-router-dom";
import { useJwt } from "./../context/JwtContext";
function FileExplorer() {
    const { jwt } = useJwt();
    
    const [volumes, setVolumes] = useState([]);
    const directoryContents = useAppSelector(selectDirectoryContents);
    const dispatch = useAppDispatch();
    const [searchResults, setSearchResults] = useState([]);
    const { pathHistory, historyPlace, setHistoryPlace, onBackArrowClick, onForwardArrowClick, canGoBackward, canGoForward, currentVolume, setCurrentVolume, onSearchClick, searchShow, setSearchShow } = useNavigation(searchResults, setSearchResults);
    async function getNewDirectoryContents() {
        const contents = await openDirectory(pathHistory[historyPlace],jwt.jwt);
        dispatch(updateDirectoryContents(contents));
    }
    async function onVolumeClick(mountpoint) {
        if (pathHistory[pathHistory.length - 1] != mountpoint) {
            pathHistory.push(mountpoint);
        }
        setHistoryPlace(pathHistory.length - 1);
        setCurrentVolume(mountpoint);
        await getNewDirectoryContents();
    }
    async function onDirectoryClick(filePath) {
        if (searchResults.length > 0) {
            setSearchResults([]);
        }
        pathHistory.push(filePath);
        setHistoryPlace(pathHistory.length - 1);
        await getNewDirectoryContents();
    }
    async function getVolumes() {
        if (volumes.length > 0) {
            return;
        }

        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/getvolume`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    
                },
            }
        );
        setVolumes(response.data);
    }
    const navigate = useNavigate();
    let render = 0;
    useEffect(() => {
        if (render === 0) {
            if (jwt.jwt == "") {
                navigate("/login");
              } else {
                getVolumes();
              }
            
        }
        render += 1; // I don't know why but the use effect runs twice causing the "get_volumes" to be called twice.
    }, []);
    useEffect(() => {
        if (pathHistory[historyPlace] == "") {
            setCurrentVolume("");
            return;
        }
        getNewDirectoryContents().catch(console.error);
    }, [historyPlace]);
    const [handleMainContextMenu, handleCloseContextMenu] = useContextMenu(dispatch, pathHistory[historyPlace]);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main>
                    <div className="text-center mt-7 font-black text-2xl">File Explorer</div>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        <div className="h-full" onClick={(e) => {
                            handleCloseContextMenu(e);
                            if (e.target instanceof HTMLElement) {
                                if (e.target.id === DIRECTORY_ENTITY_ID)
                                    return;
                            }
                            dispatch(unselectDirectoryContents());
                        }} onContextMenu={handleMainContextMenu}>
                            <ContextMenus />

                            <div className="p-4">
                                <FolderNavigation onBackArrowClick={onBackArrowClick} canGoBackward={canGoBackward()} onForwardArrowClick={onForwardArrowClick} canGoForward={canGoForward()} onSearchClick={onSearchClick} />

                                <div className="pb-5">
                                    {searchShow && <SearchBar currentVolume={currentVolume} currentDirectoryPath={pathHistory[historyPlace]} setSearchResults={setSearchResults} />}

                                    <div className="w-full">
                                        {pathHistory[historyPlace] === "" && searchResults.length === 0 ? (<VolumeList volumes={volumes} onClick={onVolumeClick} />) : (<DirectoryContents content={searchResults.length === 0 ? directoryContents : searchResults} onDirectoryClick={onDirectoryClick} />)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* <Banner /> */}
            </div>
        </div>

    );
}
export default FileExplorer;
