import { commonAPI } from "./commonAPI"
import SERVER_URL from "./serverUrl"

// get all users
export const getAllAPI = async()=>{
    return await commonAPI('GET',`${SERVER_URL}`,"")
}

// get Single users
export const getSingleUserAPI = async(id)=>{
    return await commonAPI('GET',`${SERVER_URL}/${id}`,"")
}

// get Single users
export const updateUserAPI = async(id,reqBody)=>{
    return await commonAPI('PUT',`${SERVER_URL}/${id}`,reqBody)
}

// add User Data
export const addUserDataAPI = async(reqBody) =>{
    return await commonAPI('POST',`${SERVER_URL}`,reqBody)
}

// delete User API
export const removeUserAPI = async(id)=>{
    return await commonAPI('DELETE',`${SERVER_URL}/${id}`,"")
}