var config = {
  
    siteTitle: "OAuth App",
    dbLocation: "mongodb://localhost/oauth-app",
  
    facebookConfig: {
      appID: "YOUR_APP_ID",
      appSecret: "YOUR_APP_SECRET",
      callbackUrl: "http://localhost:3000/auth/login/facebook/callback"
    },
  
    googleConfig: {
      appID: "YOUR_APP_ID",
      appSecret: "YOUR_APP_SECRET",
      callbackUrl: "http://localhost:3000/auth/login/google/callback"
    },

    jwtSecret: "myLittlePony"
  
  }
  
  module.exports = config;