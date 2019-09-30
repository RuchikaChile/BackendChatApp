var jwt = require('jsonwebtoken');
var secretkey = "secretkey";

module.exports =
{
    /*************************************************************************************************
     * @description This method is used for verifying tokens
     * @returns true or false
    **************************************************************************************************/
    checkToken(req,res,next) {
        try {
            console.log('\n============Welcome in Token Verification!!!===============');
            var token = req.header('token') || req.param.token;
            console.log('token in check token',token)
            if(token) {
                jwt.verify(token, secretkey, (err,data) => {
                    if(err) {
                        return res.json({

                            success: false,
                            message: 'InValid Token'
                        });
                    } else {
                        console.log("Data in token verification")
                        console.log(data)
                        req.body['data'] = data;
                        console.log('Decoded token is '+req.body['data'].emailid)
                        next();
                    }
                });
            } else {
                return res.json({

                    success: false,
                    message: 'Unauthorised User.'
                });
            }
        } catch(err) {
            console.log(err);
            return err;
        }
    }
}