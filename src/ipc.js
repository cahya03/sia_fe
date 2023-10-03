
import axios from "axios";
export async function openDirectory(path) {
   try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/opendirectory`,
        {"path": path},
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );
      return response.data
    } catch (error) {
      return []
    }
}
export async function openFile(path) {
   try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/openfile`,
        {"path": path},
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );
      return response.data
    } catch (error) {
      return error
    }
}
export async function createFile(path) {
   try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/createfile`,
        {"path": path},
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );
      return response.data
    } catch (error) {
      return error
    }
}
export async function createDirectory(path) {
   try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/createdirectory`,
        {"path": path},
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );
      return response.data
    } catch (error) {
      return error
    }
}
export async function renameFile(oldPath, newPath) {
   try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/renamefile`,
        {
         "old_path": oldPath,
         "new_path": newPath
      },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );
      return response.data
    } catch (error) {
      return error
    }
}
export async function deleteFile(path) {
   try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/deletefile`,
        {"path": path},
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );
      return response.data
    } catch (error) {
      return error
    }
}
