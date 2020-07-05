const actions = {
    SET_PRODUCTS: "SET_PRODUCTS",
    GET_PRODUCTS: "GET_PRODUCTS",
    SET_UI: "SET_UI",

    getProducts: () => ({
        type: actions.GET_PRODUCTS,
    }),

    setProducts: (data) => ({
        type: actions.SET_PRODUCTS,
        payload: {
            data,
        }
    }),

    setUi: (loading = false) => ({
        type:actions.SET_UI,
        payload: {
            loading
        }
    })
};

export default actions;
