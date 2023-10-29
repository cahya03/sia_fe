
import axios from "axios";

export async function openDirectory(path,jwt) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/opendirectory`,
      {
        "path": path,
        "jwt": jwt
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
    return []
  }
}
export async function openFile(path,jwt) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/openfile`,
      {
        "path": path,
        "jwt": jwt
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
export async function createFile(path,jwt) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/createfile`,
      {
        "path": path,
        "jwt": jwt
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
export async function createDirectory(path,jwt) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/createdirectory`,
      {
        "path": path,
        "jwt": jwt
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
export async function renameFile(oldPath, newPath,jwt) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/renamefile`,
      {
        "old_path": oldPath,
        "new_path": newPath,
        "jwt": jwt
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
export async function deleteFile(type,path,jwt) {
  try {
    if (type=="File") {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/deletefile`,
        {
          "path": path,
          "jwt": jwt
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );
      return response.data
    } else {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/deletefolder`,
        {
          "path": path,
          "jwt": jwt
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );
      return response.data
    }
    
  } catch (error) {
    return error
  }
}
export async function downloadFile(path,jwt) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/downloadfile`,
      {
        "path": path,
        "jwt": jwt
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          
        },
        responseType: 'blob'
      }
    );
    return response.data
  } catch (error) {
    return error
  }
}
export async function uploadFile(path,content,jwt) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/uploadfile`,
      { [path]: content },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': '*/*'
        },
      }
    );
    return response.data
  } catch (error) {
    return error
  }
}
