const db = require('../db');
module.exports.authenticate = async function (req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        let result = await db.authUser(email);
        if (result) {
            const {name, email, id } = result;
            console.log(password, result.password);
            if (String(password) === String(result.password)) {
                res.json({
                    status: true,
                    message: 'successfully authenticated',
                    userData: {
                        id,
                        name,
                        email,
                    },
                });
            } else {
                res.json({
                    status: false,
                    message: "Email and password does not match"
                });
            }
        } else {
            res.json({
                status: false,
                message: "Email does not exits"
            });
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
};
