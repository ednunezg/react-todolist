# To-do list with user authentication on React.js

This web app allows you to create a list of to-dos with custom categories. The to-dos get synched to a database under your user profile. You can leave the site or logout at anytime, then log back in and your to-dos will still be there!

Made this project for me to better learn React.js with the Flux pattern, as well as handling user authentication using social login APIs. Built on node.js/express/mongoDB on the back end, and React.js/Flux on the front end.

## Running the project

1. Install node.js and npm
2. ```$ git clone https://github.com/ednunezg/react-todolist```
3. Install dependencies ```$ npm install```
4. Use the Google and Facebook developer pages to create a new app to be used for OAuth 2 authorization.
6. Rename "app-config-SAMPLE.js" to "app-config.js" and insert your Facebook and Google app id and secret.
7. Start app ```$ npm run start:dev```
8. Go to http://localhost:3000
