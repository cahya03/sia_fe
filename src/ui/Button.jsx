export var ButtonSize;
(function (ButtonSize) {
    ButtonSize[ButtonSize["Small"] = 0] = "Small";
})(ButtonSize || (ButtonSize = {}));
export default function Button({ children, size, className, onClick }) {
    let styles = `bg-bright hover:bg-gray-600 rounded ${className + " " || ""}`;
    switch (size) {
        case ButtonSize.Small:
            styles += "h-6 w-24";
            break;
        default: break;
    }
    return (<button className={styles} onClick={onClick}>{children}</button>);
}
