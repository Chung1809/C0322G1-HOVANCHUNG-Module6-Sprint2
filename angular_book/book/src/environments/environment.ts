// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/public',
   firebaseConfig : {
    apiKey: 'AIzaSyAi3QroMXuJoXGySOqcMhTd2aHPXMpwqac',
    authDomain: 'sprint2-fc482.firebaseapp.com',
     databaseURL: 'https://sprint2-fc482-default-rtdb.asia-southeast1.firebasedatabase.app/',
    projectId: 'sprint2-fc482',
    storageBucket: 'sprint2-fc482.appspot.com',
    messagingSenderId: '139352620381',
    appId: '1:139352620381:web:6555967fe49c5737cd7cb4',
    measurementId: 'G-V576RNC23H'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
