const axios = require("axios");
const API_URL = 'http://localhost:3001/v1'

const login = async (username) => {
    const result = await axios.post(`${API_URL}/auth/login`, {username})
    //TODO : HANDLE ERRORS
    return result.data
}

const getUserFiles = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const result = await axios.get(`${API_URL}/files`, config)
    //TODO : HANDLE ERRORS
    console.log('result', result)
    return result.data
}

const uploadFile = async () => {

}

export {
    login,
    getUserFiles
}