//require services file
var userService = require('../services/user_services');

module.exports = {

    /*************************************************************************************************
     * @description This method is used for registration
     * @param string firstname, lastname, mobileno, emailid, password
     * @returns true or false
    **************************************************************************************************/
    registerController(req, res)
    {
        try 
        {
            req.checkBody('firstname', 'First name should not be empty.').notEmpty();
            req.checkBody('firstname', 'Please enter only lettes.').isAlpha();
            req.checkBody('lastname', 'Last name should not be empty.').notEmpty();
            req.checkBody('lastname', 'Please enter only letters.').isAlpha();
            req.checkBody('mobileno', 'Mobile number should not be empty').notEmpty();
            req.checkBody('mobileno', 'Please enter only numeric.').isNumeric();
            req.checkBody('mobileno', 'Please enter 10 digit mobile number.').isLength({max : 10});
            req.checkBody('mobileno', 'Please enter 10 digit mobile number.').isLength({min : 10});
            req.checkBody('emailid', 'Email id should not be empty').notEmpty();
            req.checkBody('emailid', 'Please enter valid email id.').isEmail();
            req.checkBody('password', 'Password should not be empty.').notEmpty();
            req.checkBody('password', 'Password length should be minimum 6.').isLength({min : 6});

            var errors = req.validationErrors();
            var response = {};

            if(errors)
            {
                response.success = false;
                response.error = errors;
                return res.status(422).send(response);
            }
            else 
            {
                //taking data from user so using body
                var userData = {
                    firstname : req.body.firstname,
                    lastname : req.body.lastname,
                    mobileno : req.body.mobileno,
                    emailid : req.body.emailid,
                    password : req.body.password
                }
                console.log('\nTaking data from user: ');
                console.log(userData);
                //calling registerService method of service file
                userService.registerService(userData, (err, data) =>  {
                    if(err) {
                        response.success = false;
                        response.error = err;
                        //client error 400 indicates bad request
                        return res.status(400).send(response);
                    }
                    else {
                        response.success = true;
                        response.result = data;
                        //200 indicates clients req accepted successfully
                        return res.status(200).send(response);
                    }
                });
            }
        }
        catch (err) 
        {
            console.log(err);
            return err;
        }
    },

    /*************************************************************************************************
     * @description This method is used for Login
     * @param string emailid, password
     * @returns true or false
    **************************************************************************************************/
    loginController(req, res) 
    {
        try 
        {
            req.checkBody('emailid', 'Email id should not be empty').notEmpty();
            req.checkBody('emailid', 'Please enter valid email id.').isEmail();
            req.checkBody('password', 'Password should not be empty.').notEmpty();
            req.checkBody('password', 'Password length should be minimum 6.').isLength({min : 6});

            var errors = req.validationErrors();
            var response = {};

            if(errors)
            {
                response.success = false;
                response.error = errors;
                return res.status(422).send(response);
            }
            else
            {
                var logindata = 
                {
                    emailid : req.body.emailid,
                    password : req.body.password
                }
                //calling loginService method of service file
                userService.loginService(logindata, (err, data) => 
                {
                    if(err) 
                    {
                        response.success = false;
                        response.result = err;
                        //client error 400 indicates bad request
                        return res.status(400).send(response);
                    } 
                    else 
                    {
                        response.success = true;
                        response.result = data;
                        //200 indicates clients req accepted successfully
                        return res.status(200).send(response);
                    }
                });
            }
        }
        catch (err) 
        {
            console.log(err);
            return err;
        } 
    },

    /*************************************************************************************************
     * @description This method is used for Forget password
     * @param string emailid
     * @returns true or false
    **************************************************************************************************/
    forgetController(req, res)
    { 
        try
        {
            req.checkBody('emailid', 'Email id should not be empty').notEmpty();
            req.checkBody('emailid', 'Please enter valid email id.').isEmail();

            var errors = req.validationErrors();
            var response = {};

            if(errors)
            {
                response.success = false;
                response.error = errors;
                return res.status(422).send(response);
            }
            else
            {
                var forgetdata = 
                {
                    emailid : req.body.emailid,
                }
                var response = {};
                //calling forgetService method of service file
                userService.forgetService(forgetdata, (err, data) => 
                {
                    if(err) 
                    {
                        response.success = false;
                        response.result = err;
                        //client error 400 indicates bad request
                        return res.status(400).send(response);
                    } else 
                    {
                        response.success = true;
                        response.result = data;
                        //200 indicates clients req accepted successfully
                        return res.status(200).send(response);
                    }
                });
            }
        }
        catch (err) 
        {
            console.log(err);
            return err;
        }
    },

    /*************************************************************************************************
     * @description This method is used for Reset Password
     * @param string password
     * @returns true or false
    **************************************************************************************************/
    resetController(req, res) 
    {
        try 
        {
            req.checkBody('password', 'Password should not be empty.').notEmpty();
            req.checkBody('password', 'Password length should be minimum 6.').isLength({min : 6});

            var errors = req.validationErrors();

            var response = {};

            if(errors)
            {
                response.success = false;
                response.error = errors;
                return res.status(422).send(response);
            }
            else
            {
                console.log('body is ',req.body);
                var resetdata = {
                    _id : req.body['data'].id,
                    password : req.body.password,
                }
                console.log("\nReseted data: ")
                console.log(resetdata)
                var response = {};
                //calling forgetService method of service file
                userService.resetService(resetdata, (err, data) => {
                    if(err) {
                        response.success = false;
                        response.result = err;
                        //client error 400 indicates bad request
                        return res.status(400).send(response);
                    } else {
                        response.success = true;
                        response.result = data;
                        //200 indicates clients req accepted successfully
                        return res.status(200).send(response);
                    }
                });
            }   
        }
        catch (err) 
        {
            console.log(err);
            return err;
        }
    },

    /*************************************************************************************************
     * @description This method is used for displaying all users
     * @returns true or false
    **************************************************************************************************/
    displayAllUser(req, res) 
    {
        try {
            var response = {};
            userService.allUser(req, (err, result) => {
              if (err) {
                //send status as false to show error
                response.success = false;
                response.error = err;
                res.status(400).send(response);
              }
              else {
                //send status as true for successful result
                response.success = true;
                response.result = result;
                res.status(200).send(response);
              }
            })
        } catch (err) {
            //handle exception
            console.log('Error');
        }
    },

    /*************************************************************************************************
     * @description This method is used for adding new message
     * @param string senderId, senderName, receiverId, receiverName, message
     * @returns true or false
    **************************************************************************************************/
    addNewMessage(req)
    {
        // console.log("message: ",req);
        try 
        {
            // console.log("in try message: ",req);
            // req.checkBody('senderId', 'SenderId should not be empty.').notEmpty();
            // req.checkBody('senderName', 'SenderName should not be empty.').notEmpty();
            // req.checkBody('receiverId', 'ReceiverId should not be empty.').notEmpty();
            // req.checkBody('receiverName', 'ReceiverName should not be empty.').notEmpty();
            // req.checkBody('message', 'message should not be empty.').notEmpty();

            // var errors = req.validationErrors();

            // var response = {};

            // if(errors)
            // {
            //     response.success = false;
            //     response.error = errors;
            //     return res.status(422).send(response);
            // }
            // else
            // {
                console.log("in else: ",req);
                var addMessage = {
                    
                    senderId : req.senderId,
                    senderName : req.senderName,
                    receiverId : req.receiverId,
                    receiverName :req.receiverName,
                    message : req.message
                }
                console.log("\nAdd Message  in controller : ");
                console.log(addMessage)
                var response = {};
                
                userService.addNewMessage(addMessage, (err, result) => 
                {
                    if (err) 
                    {
                        response.success = false;
                        response.error = err;
                        // response.status(400).send(response);
                    } 
                    else 
                    {
                        response.success = true;
                        response.result = result;
                        // response.status(200).send(response);
                    }
                })
            // }
        } 
        catch (error) 
        {
            console.log('Error in add new message');
        }
    },

    /*************************************************************************************************
     * @description This method is used for get all user messages
     * @returns true or false
    **************************************************************************************************/
    getUserMessage(req, res)
    {
        try 
        {  
            userService.getUserMessage(req, (err, result) => 
            {
                var response = {};
                if (err) 
                {
                    response.success = false;
                    response.err = err;
                    res.status(500).send(response);
                }
                else 
                {
                    response.success = true;
                    response.result = result;
                    res.status(200).send(response);
                }
            })
        }
        catch (err)
        {
          
          console.log("Error");
        }
    }
}