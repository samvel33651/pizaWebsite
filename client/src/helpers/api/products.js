import { apiRequest } from './index';

const getProducts = () => {
    const req = {
        method: 'GET',
        url: '/products',
    };

    return apiRequest(req);
};

const productsApi = {
    getProducts,
}

export default productsApi;
