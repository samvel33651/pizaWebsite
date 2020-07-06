const db = require('../db');

module.exports.getProducts = async function (req, res) {
    try {
        let results = await db.getAllProducts();
        if (results) {
           res.send({
               status: 'Ok',
               products: results
           })
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
};
