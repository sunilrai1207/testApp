import axios from "axios";
import {getCookie} from "../components/helpers/common";
import {getApiRoute} from "./apiRouting"

async function getHeaders(authenticated = false,requiredHeaders = null) {
    const headers = {};     
    let cookie = getCookie("kheloindia");
    let token = null
    if(cookie) {
        let encode = atob(cookie);
        encode = JSON.parse(encode)
        token = encode.Token;
    }
    if(authenticated){
        if(requiredHeaders) {
            return {
                headers: requiredHeaders
            }
        } else {
            
            return {
                headers: {Authorization:`Bearer ${token}` }
            }
        }
    } else {
        return {headers};
    }
}
function checkStatus(response) {
    if(response.status >= 200 && response.status < 300){
        return response
    } else {
        let error = new Error();
        throw error;
    }
}
function onAPIError(response) {
    if(response.status  && response.status === 403){
         
    }  
}
function onAPIResponse(response) {
    return response; 
}
export async function getRequest(route,params,authenticated = true,direct = false) {
    
    let url = direct ? route:await getApiRoute(route,params);
    return await axios
    .get(url,await getHeaders(authenticated))
    .then(checkStatus)
    .then(onAPIResponse)
    .catch(onAPIError)
}
export async function deleteRequest(route,params,authenticated = true,direct = false) {
    
    let url = direct ? route:await getApiRoute(route,params);
    return await axios
    .delete(url,await getHeaders(authenticated))
    .then(checkStatus)
    .then(onAPIResponse)
    .catch(onAPIError)
}
export async function postRequest(route,data,params,authenticated = true,direct = false) {
    let url = direct ? route:await getApiRoute(route,data);
    return await axios
    .post(url,data,await getHeaders(authenticated))
    .then(checkStatus)
    .then(onAPIResponse)
    .catch(onAPIError)
}