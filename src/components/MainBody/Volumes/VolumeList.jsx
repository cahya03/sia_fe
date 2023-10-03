import VolumeComponent from "./VolumeComponent";
import LoadingPlaceholder from "../Util/LoadingPlaceholder";
export default function VolumeList({ volumes, onClick }) {
    return (<div className="space-x-4">
            {volumes.length == 0 ? <LoadingPlaceholder /> : volumes.map((volume, idx) => (<VolumeComponent onClick={() => onClick(volume.mountpoint)} volume={volume} key={idx}/>))}
        </div>);
}
