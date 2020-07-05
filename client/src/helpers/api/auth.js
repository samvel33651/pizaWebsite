import { apiRequest } from './index';

const registerUser = (data) => {
    const req = {
        method: 'POST',
        url: '/register',
        data,
    };

    return apiRequest(req);
};

const authenticateUser = (data) => {
    const req = {
        method: 'POST',
        url: '/authenticate',
        data
    };

    return apiRequest(req);
}

const authApi = {
    registerUser,
    authenticateUser,
}

export default authApi;
