const connection = require('../config');
const db = require('../db');

module.exports.register= async function(req,res){
    try {
        const today = new Date();
        const user = {
            "name":req.body.name,
            "email":req.body.email,
            "password":req.body.password,
            "created_at":today,
            "updated_at":today
        }
        const result = await db.registerUser(user);
        if (result) {
            res.json({
                status: true,
                data: result,
                message:'user registered successfully'
            })
        }

    } catch(error) {
        console.log(error);
        res.json({
            status:false,
            message:'there are some error with query',
            error,
        })
    }
}
