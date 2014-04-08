'use strict';

angular.module('icudo')
  .factory('AuthFactory', ['$firebase', '$firebaseSimpleLogin', '$log', 'dataConfig', function($firebase, $firebaseSimpleLogin, $log, dataConfig) { 
    var mainRef = new Firebase(dataConfig.firebaseBaseUrl);
    return $firebaseSimpleLogin(mainRef); 
  }])
