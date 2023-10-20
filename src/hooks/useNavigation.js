import { useState } from "react";
export default function useNavigation(searchResults, setSearchResults) {
    const [pathHistory, setPathHistory] = useState([""]);
    const [historyPlace, setHistoryPlace] = useState(0);
    const [currentVolume, setCurrentVolume] = useState("");
    const [searchShow,setSearchShow] = useState(false);
    function onBackArrowClick() {
        if (searchResults.length > 0) {
            setHistoryPlace(historyPlace);
            setSearchResults([]);
            return;
        }
        pathHistory.push(pathHistory[historyPlace - 1]);
        setHistoryPlace((prevPlace) => prevPlace - 1);
    }
    function onForwardArrowClick() {
        setHistoryPlace((prevPlace) => prevPlace + 1);
    }
    function onSearchClick(){
        searchShow ? setSearchShow(false) : setSearchShow(true)
    }
    function canGoForward() {
        return historyPlace < pathHistory.length - 1;
    }
    function canGoBackward() {
        return historyPlace > 0;
    }
    return {
        pathHistory,
        setPathHistory,
        historyPlace,
        setHistoryPlace,
        onBackArrowClick,
        onForwardArrowClick,
        canGoForward,
        canGoBackward,
        currentVolume,
        setCurrentVolume,
        onSearchClick,
        setSearchShow,
        searchShow,
    };
}
