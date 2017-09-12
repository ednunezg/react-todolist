var config = {
  
    siteTitle: "OAuth App",
    dbLocation: "mongodb://localhost/oauth-app",
  
    facebookConfig: {
      appID: "2353889744835609",
      appSecret: "8abebe5201dee56a57e8200a4d0445bb",
      callbackUrl: "http://localhost:3000/auth/login/facebook/callback"
    },
  
    googleConfig: {
      appID: "614545485749-oig4iircafuop4u2vqusqhf4fslm4kp1.apps.googleusercontent.com",
      appSecret: "2XSXwe7bpN4IS1so5CcRm365",
      callbackUrl: "http://localhost:3000/auth/login/google/callback"
    },

    jwtSecret: "myLittlePony"
  
  }
  
  module.exports = config;