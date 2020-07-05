import axios from 'axios';
const API_URL = "http://localhost:3001/api";

export function apiRequest(req, withHeaders) {
    const url = API_URL + req.url;

    if (!req.headers) {
        req.headers = {};
    }


    req.headers['X-Requested-With'] = 'XMLHttpRequest';
    req.headers['Content-Type'] = 'application/json';

    if (!req.params) req.params = {};
    if (!req.data) req.data = {};


    const axiosData = {
        method: req.method,
        url,
        headers: req.headers,
        params: req.params,
        data: req.data,
    };

    return axios(axiosData).then(response => {
            return  withHeaders ? { data: response.data, headers: response.headers } : response.data;

        })
        .catch(error => {
            throw error.response;
        });
}

