//require model file
var userModel = require('../models/user_model');

module.exports = {

    /*************************************************************************************************
     * @description This method is used for registration
     * @param string firstname, lastname, mobileno, emailid, password
     * @returns true or false
    **************************************************************************************************/
    registerService(registerData, callback) {
        userModel.register(registerData, (err, data) => {
            if(err) {
                return callback(err);
            } else
            {
                return callback(null, data);
            }
        });
    },

   /*************************************************************************************************
     * @description This method is used for Login
     * @param string emailid, password
     * @returns true or false
    **************************************************************************************************/
    loginService(loginData, callback) {
        userModel.login(loginData, (err, data) => {
            if(err) {
                return callback(err)
            } else {
                return callback(null, data);
            }
        })
    },

    /*************************************************************************************************
     * @description This method is used for Forget password
     * @param string emailid
     * @returns true or false
    **************************************************************************************************/
    forgetService(forgetdata, callback) {
        userModel.forget(forgetdata, (err, data) => {
            if(err) {
                return callback(err)
            } else {
                return callback(null, data);
            }
        })
    },

    /*************************************************************************************************
     * @description This method is used for Reset Password
     * @param string password
     * @returns true or false
    **************************************************************************************************/
    resetService(resetdata, callback) {
        userModel.reset(resetdata, (err, data) => {
            if(err) {
                return callback(err)
            } else {
                return callback(null, data);
            }
        })
    },

    /*************************************************************************************************
     * @description This method is used for displaying all users
     * @returns true or false
    **************************************************************************************************/
    allUser(data, callback) {
        userModel.allUsers(data, (err, result) => {
            if (err) {
                //throw the error
                callback(err);
            }
            else {
                callback(null, result);
            }
        })
    },

     /*************************************************************************************************
     * @description This method is used for adding new message
     * @param string senderId, senderName, receiverId, receiverName, message
     * @returns true or false
    **************************************************************************************************/
    addNewMessage(addMessage, callback)
    {
        userModel.addNewMessage(addMessage, (err, res) => 
        {
            if (err) 
            {
                return callback(err)
            } 
            else 
            {
                return callback(null, res);
            }
        })
    },

    /*************************************************************************************************
     * @description This method is used for get all user messages
     * @returns true or false
    **************************************************************************************************/
    getUserMessage(data, callback)
    {
        userModel.getUserMessage(data, (err, result) => 
        {
            if (err) 
            {
                return callback(err);
            }
            else 
            {
                return callback(null, result);
            }
        })
    }  
}
