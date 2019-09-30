//require mongoose
const mongoose = require('mongoose');

//require bcrypt
const bcrypt = require("bcrypt");

//require files
var authentication = require('../authentication/tokengeneration');
var nodeMailer = require('../email/email');

//creating schema in database
const Schema = mongoose.Schema({
    firstname: {
        type: String,
        require: [true, 'first name should not be empty']
    },
    lastname: {
        type: String,
        require: [true, 'last name should not be empty']
    },
    mobileno: {
        type: String,
        require: [true, 'mobile number should not be empty']
    },
    emailid: {
        type: String,
        require: [true, 'email id should not be empty']
    },
    password: {
        type: String,
        require: [true, 'password should not be empty']
    },
   
}, { timestamps: true });

var user = mongoose.model('user', Schema);

//creating chatschema in database
const chatSchema = mongoose.Schema({
    senderId: {
        type: String,
        required: [true, "Sender id is require enter sender email id"]
    },

    senderName: {
        type: String,
        required: [true, "Sender id is require enter sender email id"]
    },

    receiverId: {
        type: String,
        required: [true, "Receiver id is require enter receiver email id"]
    },

    receiverName: {
        type: String,
        required: [true, "Sender id is require enter sender email id"]
    },

    message: {
        type: String,
        required: [true, "Enter any message not empty "]
    }

},{ timestamps: true });

var chat = mongoose.model('chat', chatSchema);

function hash(password)
{
    const saltRounds = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, saltRounds);
    return hashPassword;
}

module.exports = {

    /*************************************************************************************************
     * @description This method is used for registration
     * @param string firstname, lastname, mobileno, emailid, password
     * @returns true or false
    **************************************************************************************************/
    register(createData, callback) 
    {
        try 
        {
            console.log('\n**************Welcome to Registration!!!******************');
            console.log('\nUser data is created in database: ');
            console.log(createData)
            var registerDetails = new user ({
                "firstname": createData.firstname,
                "lastname": createData.lastname,
                "mobileno": createData.mobileno,
                "emailid": createData.emailid,
                "password": hash(createData.password),
            })
            //saving data
            registerDetails.save((err, data) => {
                if(err) {
                    console.log("\nFailed to Registered")
                    return callback(err);
                } else {
                    console.log("\nRegistered successfully")
                    return callback(null, { message: 'Registered successfully', data });
                }
            });
        }
        catch(err)
        {
            console.log("Error");
        }
    },

    /*************************************************************************************************
     * @description This method is used for Login
     * @param string emailid, password
     * @returns true or false
    **************************************************************************************************/
    login(loginData, callback)
    {
        try 
        {
            console.log('\n**************Welcome to Login !!!******************');
            console.log("\nUser Enter Emailid: "+loginData.emailid)
            //use findone method to find emailid
            user.findOne({'emailid': loginData.emailid}, (err, data) => {
    
                console.log('\nEntered emailid is found in database Successfully');
                if(err) 
                {
                        return callback(err);
                } 
                else 
                {
                    bcrypt.compare(loginData.password,data.password,(err,result) =>
                    {
                        if(result) {
                            var payload = {
                                "_id" : data._id,
                                "emailid" : loginData.emailid
                            }
                            var token = authentication.generateToken(payload);
                            console.log("\nSuccessfully loged in!!!");
                            return callback(null, {message: 'Successfully loged in' ,data,token:token});
                        }else {
                            console.log("\nFailed loged in!!");
                            return callback({message: "Failed to login" ,err});
                        }
                        
                    });
                }
            });
        }
        catch(err)
        {
            console.log("Error");
        }
    },

    /*************************************************************************************************
     * @description This method is used for Forget password
     * @param string emailid
     * @returns true or false
    **************************************************************************************************/
    forget(forgetdata, callback)
    {
       try
       {
           console.log('\n**************Welcome to forget password!!!******************');
           console.log('\nEnter emailid by user is: ' + forgetdata.emailid);
           user.findOne({ 'emailid': forgetdata.emailid }, (err, data) => 
           {
               console.log("\nsearch data is: ",data);
               console.log("\nDatabase emailid is: ",data.emailid);
               console.log("\nEntered emailid found in database so you can reset your password");
               if(err)
               {
                   return callback(err);
               }
               else
               {
                   var payload =
                   {
                       "emailid": forgetdata.emailid,
                       "id":data._id,
                   }

                   var token = authentication.generateToken(payload);

                   console.log('\nGenrating token for foget password: ');
                   console.log(token.token);

                   var url = 'http://localhost:4000/#/reset/' + token.token;
                   console.log(url)
                   nodeMailer.sendEmail(forgetdata.emailid, url);
                   
                   return callback(null, { message: 'reset passsword link has been sent to your email id', data, url : url});
               }
           });
       }
       catch(err)
       {
           console.log("Error");
       }
    },
    /*************************************************************************************************
     * @description This method is used for Reset Password
     * @param string password
     * @returns true or false
    **************************************************************************************************/
    reset(resetdata, callback) 
    {
        try
        {
            console.log('\n**************Welcome to reset password!!!******************');
            user.findOneAndUpdate({ '_id': resetdata._id }, {$set: {"password" : hash(resetdata.password)}}, (err, data) =>
            {
                if(err)
                {
                    return callback(err);
                }
                else
                {
                    console.log("\nUser data after reseting new password");
                    console.log(data);
                    console.log("\nReseted Password Successfully!!! ");
                    return callback(null, { message: 'Password set successfully.',data});
                }
            });
        }
        catch(err)
        {
            console.log("Error");
        }
    },

    /*************************************************************************************************
     * @description This method is used for displaying all users
     * @returns true or false
    **************************************************************************************************/
    allUsers(res, callback)  
    {
        try 
        {
            console.log('\n**************Displaying All Users******************');
            //find the all the users in database
            user.find({}, (err, data) => 
            {
                if (err) 
                {
                    console.log(err, "Error")
                    return callback({message: "Failed to Display all users" ,err});
                }
                else
                {
                    console.log(data);
                    //return the result
                    return callback(null,{message : "Displayed all users Successfully", data});
                }
            })
        }
        catch (err) 
        {
            //handle exception
            console.log("Error");
        }
    },

   /*************************************************************************************************
     * @description This method is used for adding new message
     * @param string senderId, senderName, receiverId, receiverName, message
     * @returns true or false
    **************************************************************************************************/
    addNewMessage(req, callback)
    {
        try
        {
            console.log('\n**************Adding New Message of Users******************');
        
            const newMsg = new chat({
                "senderId": req.senderId,
                "senderName": req.senderName,
                "receiverId": req.receiverId,
                "receiverName": req.receiverName,
                "message": req.message
            });

            console.log("New Message is : ");
            console.log(newMsg);

            //save mes
            newMsg.save((err, result) => 
            {
                if (err) 
                {
                    console.log("Fail to store the message in database", err);
                    return callback({message : "Fail to save message in database", result});
                    
                } 
                else 
                {
                    console.log("Message saved in database");
                    return callback(null, {message : "Message saved in database", result});
                }
            });
        }
        catch (err) {
            console.log("Error");
           
        }
    },

    /*************************************************************************************************
     * @description This method is used for get all user messages
     * @returns true or false
    **************************************************************************************************/
    getUserMessage(res, callback) 
    {
        try 
        {
            console.log('\n**************Displaying All Users Messages******************');
            chat.find({}, (err, result) => 
            {
                if (err) 
                {
                    return callback(err);
    
                }
                else 
                {
                    console.log(result);
                    return callback(null, result);
                }
    
            })
        }
        catch (err)
        {
            console.log("Error");
        }
    }
}