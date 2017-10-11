# Todo list with user authentication on React.js
![](http://i65.tinypic.com/28wjrzc.jpg)

Made this project for me to better learn React.js with the Flux pattern, as well as handling user authentication using social login APIs.

This web app allows you to create a list of todos with custom categories. The todos get synched to a database under your user profile, allowing you to leave the site and log back in at any time.

Project is built on node.js/express/mongoDB on the back end, and React.js/Flux on the front end.

## Running the project

1. Install node.js and npm
2. ```$ git clone https://github.com/ednunezg/react-todolist```
3. Install dependencies ```$ npm install```
4. Use the Google and Facebook developer pages to create a new app to be used for OAuth 2 authorization.
6. Rename "app-config-SAMPLE.js" to "app-config.js" and insert your Facebook and Google app id and secret.
7. Start app ```$ npm run start:dev```
8. Go to http://localhost:3000
