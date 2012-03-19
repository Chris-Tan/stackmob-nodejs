#Stackmob JS SDK for NodeJS

Example: 
  StackMob = require("stackmob-nodejs")

  StackMob.init({
   urlRoot: "http://api.mob1.stackmob.com/",
   consumerKey: "publicKey",
   consumerSecret: "secretKey",
   appName: 'appName',
   version: 0,
   dev: true
  });

  function read() {
    var username = "anonymous";
    if (username != '') {
      //Call StackMob via Ajax to read a user
      var fetchuser = new StackMob.User({ 'username': username });
      fetchuser.fetch({
        success: function(model) {
          console.log("We fetched the user from StackMob!");
          console.log(model.toJSON());
        },
        error: function(model, response) {
          console.log(response);
        }
      });
    }
  }

  read();