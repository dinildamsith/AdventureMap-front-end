import {BASE_URL} from "../config&Varibles/endPointUrls.js";
import axios from "axios";

export const AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'content-Type': 'application/json'
    }

})
