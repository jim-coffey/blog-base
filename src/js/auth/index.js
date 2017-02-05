import angular from 'angular';

// Create the auth module where our functionality can attach
let authModule = angular.module('app.auth', []);

// Include our UI-Router config settings
import AuthConfig from './auth.config';
authModule.config(AuthConfig);

// Controllers
import AuthCtrl from './auth.controller';
authModule.controller('AuthCtrl', AuthCtrl);

export default authModule;
