const db = require('../db');
const placeOrder = async function(req, res) {
    try {
        console.log(req);
        const { userID, data , delivery_address } = req.body;
        let result = await db.placeOrder({user_id: userID, delivery_address: delivery_address}, data);
        res.send({
            status: true,
            result,
        });
    } catch(error){ }
}

const getUserOrders = async function(req, res) {
    try {
        const  userID = req.params.id;
        let results = await db.getUserOrders(userID);
        if (results) {
            results =results.flat();
            res.status(200).send({ data: results });
        }
    } catch(error) {

    }
}

module.exports = {
    placeOrder,
    getUserOrders
}
