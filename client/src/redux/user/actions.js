const  actions = {
    LOGIN_USER: "LOGIN_USER",
    REGISTER_USER: "REGISTER_USER",

    GET_USER_ORDERS: "GET_USER_ORDERS",

    SET_USER_INFO: "SET_USER_INFO",
    SET_USER_ORDERS: "SET_USER_ORDERS",
    PLACE_ORDER: "PLACE_ORDER",
    TOGGLE_ORDERS_LOADING: "TOGGLE_ORDERS_LOADING",
    UI_SET: "UI_SET",
    ADD_TO_NEW_ORDER: "ADD_TO_NEW_ORDER",
    REMOVE_FROM_NEW_ORDERS: "REMOVE_FROM_NEW_ORDERS",
    CHANGE_ORDER_QUANTITY: "CHANGE_NEW_ORDER_QUANTITY",
    RESET_NEW_ORDER: "RESET_NEW_ORDER",
    APP_START: "APP_START",
    SET_APP_STARTED: "SET_APP_STARTED",
    LOGOUT: "LOGOUT",
    RESET_USER_INFO: "RESET_USER_INFO",
    SET_CART_TO_STORAGE: "SET_CART_TO_STORAGE",
    SET_NEW_ORDERS: "set_NEW_ORDERS",

    logout: () => ({
       type: actions.LOGOUT,
    }),

    appStart: () => ({
        type: actions.APP_START,
    }),

    setAppStarted: (status = false) => ({
        type: actions.SET_APP_STARTED,
        payload: {
            status,
        }
    }),

    setUserInfo: (userInfo) => ({
       type: actions.SET_USER_INFO,
       payload: {
           userInfo,
       }
    }),

    login: (data, redirectAfter) => ({
        type: actions.LOGIN_USER,
        payload:{
            data,
            redirectAfter
        }
    }),

    register: (userData) => ({
        type: actions.REGISTER_USER,
        payload: {
            userData
        }
    }),

    placeOrder: (deliveryAddress) => ({
       type: actions.PLACE_ORDER,
        payload: {
           deliveryAddress,
        }
    }),

    getUserOrders: (userID = null) => ({
        type: actions.GET_USER_ORDERS,
        payload: {
            userID
        }
    }),

    setUserOrders: (data) => ({
        type: actions.SET_USER_ORDERS,
        payload: {
            data,
        }
    }),

    toggleOrdersLoading: (loading= false) =>({
        type: actions.TOGGLE_ORDERS_LOADING,
        payload: {
            loading,
        }
    }),

    setUi: (loading = false) => ({
        type: actions.UI_SET,
        payload: {
            loading,
        }
    }),

    addNewOrder: (order) => ({
        type:  actions.ADD_TO_NEW_ORDER,
        payload: {
            order,
        }
    }),

    removeFromOrder: (prodID) => ({
        type: actions.REMOVE_FROM_NEW_ORDERS,
        payload: {
            prodID,
        }
    }),

    changeOrderQTY: (prodID, qty) =>({
       type: actions.CHANGE_ORDER_QUANTITY,
       payload: {
           prodID,
           qty,
       }
    }),
    resetNewOrder: () => ({
        type: actions.RESET_NEW_ORDER
    }),

    resetUserInfo: () => ({
       type: actions.RESET_USER_INFO
    }),

    setCartToStorage: () => ({
       type: actions.SET_CART_TO_STORAGE,
    }),

    setNewOrders: (newOrders) => ({
       type: actions.SET_NEW_ORDERS,
       payload: {
           newOrders,
       }
    }),
}

export default actions;
