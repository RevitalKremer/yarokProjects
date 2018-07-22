
class ContactUs {
    constructor($rootScope, $http, $animate) 
    {
        this.restrict = 'AE';
        this.templateUrl = '../../templates/Directives/contactUsTemplate.html';
        this.$rootScope = $rootScope;
        this.$http = $http;
        this.$animate = $animate;
        this.scope = {
        };


        this.link = function(scope)
        {
            this.directiveScope = scope;
            scope.$rootScope = this.$rootScope;

            scope.sendMail = function()
            {
                var data = ({
                    contactName : scope.contactName,
                    contactEmail : scope.contactEmail,
                    contactMsg : scope.contactMsg
                });
            
                $http.post('/api/mail', data)
                .then(
                    function(response) {
                        // success callback
                        console.log("posted successfully");
                    },
                    function(response) {
                        // failure callback,handle error here

                        console.log(response.data.message);
                    }
                );
                // $http.post('/api/mail', data).
                //     success(function(data, status, headers, config) {
                //         // this callback will be called asynchronously
                //         // when the response is available
    
                //         console.log('mail sent');
                //     }).
                //     error(function(data, status, headers, config) {
                //         console.log('mail not sent');
    
                        
                //         // called asynchronously if an error occurs
                //         // or server returns response with an error status.
                //     });

                
            }.bind(this);


//             const nodemailer = require('nodemailer');

// // create reusable transporter object using the default SMTP transport
// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'gmail.user@gmail.com',
//         pass: 'yourpass'
//     }
// });

// // setup email data with unicode symbols
// let mailOptions = {
//     from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
//     to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world ?', // plain text body
//     html: '<b>Hello world ?</b>' // html body
// };

// // send mail with defined transport object
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Message %s sent: %s', info.messageId, info.response);
// });


            // scope.toastPosition = {
            //     bottom: false,
            //     top: true,
            //     left: false,
            //     right: true
            // };
 
            // //2. the method looks for the position that we want to display the toast
            // scope.getToastPosition = function() {
            //     return Object.keys(scope.toastPosition)
            //         .filter(function(pos) { return scope.toastPosition[pos]; })
            //         .join(' ');
            // };
 
            // //1. The send button will call this method
            // scope.sendMail = function() {
            //     var data = ({
            //     contactName : this.contactName,
            //     contactEmail : this.contactEmail,
            //     contactMsg : this.contactMsg
            // });
 
            // // Simple POST request example (passing data) :
            // $http.post('/contact-form', data).
            //     success(function(data, status, headers, config) {
            //         // this callback will be called asynchronously
            //         // when the response is available
 
            //         $mdToast.show(
            //             $mdToast.simple()
            //                 .content('Thanks for your message ' + data.contactName + ' You Rock!')
            //                 .position($scope.getToastPosition())
            //                 .hideDelay(5000)
            //         );
 
            //     }).
            //     error(function(data, status, headers, config) {
            //         // called asynchronously if an error occurs
            //         // or server returns response with an error status.
            //     });
            // };

        }.bind(this);
    }

 
    static directiveFactory($rootScope, $http, $animate) {
        ContactUs.instance = new ContactUs($rootScope, $http, $animate);
        return ContactUs.instance;
    }
}

ContactUs.$inject = ['$rootScope', '$http', '$animate'];

export default ContactUs;