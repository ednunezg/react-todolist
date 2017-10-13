var Constants = {

  //Text
  PAGE_TITLE: "World's Best Todo App",

  //Timeouts
  ALERT_MESSAGE_TIMEOUT: 10000, //Set to 10 thousand miliseconds

  //Authorization
  LOGIN_URL_LOCAL: '/auth/login/local',
  LOGIN_URL_FACEBOOK: '/auth/login/facebook',
  LOGIN_URL_GOOGLE: '/auth/login/google',
  REGISTER_URL_LOCAL: '/auth/register/local',
  
  //Hello.js
  FACEBOOK_APP_ID: "2353889744835609",
  FACEBOOK_APP_SECRET: "8abebe5201dee56a57e8200a4d0445bb",

  GOOGLE_APP_ID: "614545485749-oig4iircafuop4u2vqusqhf4fslm4kp1.apps.googleusercontent.com",
  GOOGLE_APP_SECRET: "2XSXwe7bpN4IS1so5CcRm365",


  //Todo apis
  API_TASKS_GETALL: '/api/task_getall',
  API_TASKS_CREATE: '/api/task_create',
  API_TASKS_TOGGLEDONE: '/api/task_toggledone',
  API_TASKS_DELETE: '/api/task_delete',

  API_TAGS_GETALL: '/api/tasktag_getall',
  API_TAGS_CREATE: '/api/tasktag_create',
  API_TAGS_DELETE: '/api/tasktag_delete',

}  

export default Constants;