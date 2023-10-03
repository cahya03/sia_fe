export function removeFileNameFromPath(path) {
    return path.substring(0, path.lastIndexOf("\\"));
}
export function createDirectoryContent(type, name, path) {
    return { [type]: [name, path] };
}
