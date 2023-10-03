import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
export default function FolderNavigation({ onBackArrowClick, canGoBackward, onForwardArrowClick, canGoForward }) {
    return <div className="mb-5 w-full">
        <div className="space-x-4">
            <button onClick={onBackArrowClick} disabled={!canGoBackward}>
                <FontAwesomeIcon icon={faArrowLeft} size="xl" className={canGoBackward ? undefined : "text-gray-600"}/>
            </button>

            <button onClick={onForwardArrowClick} disabled={!canGoForward}>
                <FontAwesomeIcon icon={faArrowRight} size="xl" className={canGoForward ? undefined : "text-gray-600"}/>
            </button>
        </div>
    </div>;
}
