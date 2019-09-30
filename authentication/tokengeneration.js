var jwt = require("jsonwebtoken");
var secretkey = "secretkey"

module.exports = {

    /*************************************************************************************************
     * @description This method is used for genrating token
     * @returns true or false
    **************************************************************************************************/

    generateToken(payload){
        try {
            console.log('\n============Welcome in Token Generation!!!===============');
            console.log('\nPayload data is: ');
            console.log(payload)
            var token = jwt.sign(payload,secretkey,{ expiresIn: "1d"});
            var generated ={
                success : true,
                message : "Token Generated Successfully",
                token : token
            }
            console.log("\nGenrated token Successfully: ");
            console.log(token);
            return generated;

        }catch (err) {
            console.log('Error..');
            return err;
        } 
    }
}