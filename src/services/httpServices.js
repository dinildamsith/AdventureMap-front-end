import {AxiosInstance} from "./axiosServices.js";
import toast from "react-hot-toast";




const postRequest = async (requestConfig) => {
    const url = requestConfig.url;
    const data = requestConfig.data;
    const headers = requestConfig.headers

    try {
        const response = await AxiosInstance.post(url, data, {headers});
        if (response.status === 200) {
            console.error(response)
            toast.success(response.data.description || 'Request successful');
            return response.data;
        } else {
            console.error("Unexpected response status:", response.status);
            toast.error('Failed to process request');
            return response;
        }
    } catch (error) {
        if (error.response) {
            // If error.response is defined, show the description from the response
            toast.error(error.response.data.description || 'An error occurred');
        } else {
            // If error.response is undefined, show a fallback error message
            toast.error('Network error or server is down');
        }
        return error.response || error;
    }
};



const getRequest = async (requestConfig) => {
    const url = requestConfig.url;

    try {
        const response = await AxiosInstance.get(url);
        if (response.status === 200) {
            toast.success(response.data.description || 'Request successful');
            return response.data;
        } else {
            console.error("Unexpected response status:", response.status);
            toast.error('Failed to process request');
            return response;
        }
    } catch (error) {
        if (error.response) {
            // If error.response is defined, show the description from the response
            toast.error(error.response.data.description || 'An error occurred');
        } else {
            // If error.response is undefined, show a fallback error message
            toast.error('Network error or server is down');
        }
        return error.response || error;
    }
};


const putRequest = async (requestConfig) => {

    const url = requestConfig.url;
    const data = requestConfig.data;

    try {
        const response = await AxiosInstance.put(url,data);
        if (response.status === 200) {
            toast.success(response.data.description || 'Request successful');
            return response.data;
        } else {
            console.error("Unexpected response status:", response.status);
            toast.error('Failed to process request');
            return response;
        }
    } catch (error) {
        if (error.response) {
            // If error.response is defined, show the description from the response
            toast.error(error.response.data.description || 'An error occurred');
        } else {
            // If error.response is undefined, show a fallback error message
            toast.error('Network error or server is down');
        }
        return error.response || error;
    }
};


const deleteRequest = async (requestConfig) => {

    const url = requestConfig.url;

    try {
        const response = await AxiosInstance.delete(url);
        if (response.status === 200) {
            toast.success(response.data.description || 'Request successful');
            return response.data;
        } else {
            console.error("Unexpected response status:", response.status);
            toast.error('Failed to process request');
            return response;
        }
    } catch (error) {
        if (error.response) {
            // If error.response is defined, show the description from the response
            toast.error(error.response.data.description || 'An error occurred');
        } else {
            // If error.response is undefined, show a fallback error message
            toast.error('Network error or server is down');
        }
        return error.response || error;
    }
};





export { postRequest, getRequest, putRequest, deleteRequest };
