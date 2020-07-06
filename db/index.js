const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    multipleStatements: true,
    password: '',
    user: 'root',
    database: 'pizzawebsite',
    host: 'localhost',
    port: '3306'
})

let pizzaDb = {};

pizzaDb.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * from users', (err, results) => {
            if(err) {
                return  reject(err)
            }
            return resolve(results);
        })
    })
}

pizzaDb.authUser = (email) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE email = ?', [email],  (err, result) => {
            if(err) {
                return  reject(err)
            }
            return resolve(result[0]);
        })
    })
}

pizzaDb.getAllProducts = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM products',  (err, results) => {
            if(err) {
                return  reject(err)
            }
            return resolve(results);
        })
    })
}

pizzaDb.registerUser = (user) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO users SET ?', user,  (err, result) => {
            if(err) {
                return  reject(err)
            }
            return resolve(result);
        })

    })
}

pizzaDb.getUserOrders = (userID) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT order_id FROM orders WHERE user_id = ?', [userID], (err, orders) => {
            if(err) reject(err);
            const data = [];
            let sql = ""
            const params = []
            for (let i = 0; i < orders.length; i++) {
                const {order_id} = orders[i];
                params.push(order_id);
                sql += `SELECT products.*, orderdetails.status, orderdetails.quantity as qty, orderdetails.order_id FROM products JOIN orderdetails ON products.prod_id = orderdetails.prod_id WHERE orderdetails.order_id = ${order_id};`;
                // =  pool.query( 'SELECT products.*, orderdetails.status, orderdetails.quantity as qty, orderdetails.order_id FROM products JOIN orderdetails ON products.prod_id = orderdetails.prod_id WHERE orderdetails.order_id = ?', [order_id])
            }

            pool.query(sql, (err, results) => {
                if(err) throw err;
               resolve(results);
            });
        })
    });
}

pizzaDb.placeOrder = (order, data) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO orders SET ?', order , (err, result) => {
            if(err) reject(err);
            const orderID = result.insertId
            const sql = `INSERT INTO orderdetails (order_id, prod_id, quantity, status) VALUES ?`;
            const values = [];
            const status = 0; //on the way
            for (let i = 0; i < data.length; i++ ) {
                const { prod_id, quantity } = data[i];
                values.push([orderID, prod_id, quantity, status]);
            }

            pool.query(sql, [values], (err, results) => {
               if(err) throw err;
               console.log(results);
               resolve(results);
            });
        });
    })
}

module.exports = pizzaDb;
