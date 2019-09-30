var nodeMailer = require('nodemailer');

module.exports =
{
    /*************************************************************************************************
     * @description This method is used for sending mails
     * @returns true or false
    **************************************************************************************************/
   sendEmail(emailid, url)
   {
       try
       {
           console.log('In email');
           const smtpTransporter = nodeMailer.createTransport(
           {
               service: 'gmail',
               auth:
               {
                   user: 'userdummy1304@gmail.com',
                   pass: 'dummyuser1304'
               },
           });

           const mailOptions =
           {
               from: 'userdummy301996@gmail.com',
               to: emailid,
               subject: "Reset Password Link",
               html: url,
           };

           smtpTransporter.sendMail(mailOptions, (err, response) =>
           {
               if(err)
               {
                   console.log("Error " + err);
               }
               else
               {
                   console.log("Response: ", response);
               }
           });
       }
       catch(err)
       {
           console.log("Error")
       }
   }

}