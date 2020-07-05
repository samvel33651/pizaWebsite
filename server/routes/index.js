const express = require('express');
/**
 *  Controllers start
 **/
const authenticateController = require('../controllers/authenticate-controller');
const registerController = require('../controllers/register-controller');
const productsController = require('../controllers/products-controller');
const ordersController = require('../controllers/orders-controller');

const router = express.Router();

router.get('/', (req,  res, next) => {
    res.json({msg: "tes", status: 200});
});
/**
 * Registration  route
 * params: { name, email, password}
 * **/
router.post('/register', registerController.register);

/**Auth  route
 * params: { email, password}
 * **/
router.post('/authenticate',authenticateController.authenticate);

/**All products **/
router.get('/products', productsController.getProducts);

router.post('/orders/place', ordersController.placeOrder);
router.get('/orders/:id', ordersController.getUserOrders);

module.exports = router;
