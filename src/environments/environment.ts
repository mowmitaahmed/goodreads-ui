// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseLink: 'http://localhost:3000',
  // apiBaseLink: 'https://api.emedilife.com.bd',
  ftpBaseLink: 'http://localhost:3000',
  // ftpBaseLink: 'https://ftp.emedilife.com.bd',
  appBaseUrl: '/',
  userBaseUrl: '/account',
  userLoginUrl: '/login',
  adminLoginUrl: 'admin/login',
  adminBaseUrl: 'admin',
  storageSecret: 'SOFT_2021_IT_1998',
  VERSION: 1
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
