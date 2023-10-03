export var InputSize;
(function (InputSize) {
    InputSize[InputSize["Tiny"] = 0] = "Tiny";
    InputSize[InputSize["Large"] = 1] = "Large";
})(InputSize || (InputSize = {}));
export default function Input({ value, onChange, setValue, placeholder, onSubmit, size, className, disabled, min, max }) {
    let styles = `outline-none bg-darker border-gray-500 border-1 rounded-md focus:border-gray-300 p-2 disabled:opacity-25 ${className + " " || ""}`;
    switch (size) {
        case InputSize.Large:
            styles += "h-10 w-72";
            break;
        case InputSize.Tiny:
            styles += "h-6 w-20 text-center";
            break;
        default: break;
    }
    function onKeydown({ key, target }) {
        if (key === "Enter" && onSubmit) {
            onSubmit();
        }
    }
    return (<input disabled={disabled} value={value} onChange={(e) => setValue ? setValue(e.target.value) : onChange ? onChange(e) : undefined} className={styles} placeholder={placeholder} onKeyDown={onKeydown} min={min} max={max}/>);
}
