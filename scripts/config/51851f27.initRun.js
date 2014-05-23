'use strict';

/* 
 * bootstrapping the application. executed when the app is loaded.
 */

angular.module('icudo')
.run(['$rootScope', '$log', function($rootScope, $log){
  
  $log.log('Let\'s get it started!');

  //set loading state onto the rootScope it's the job of services and controllers to unset it when they are done bootstrapping
  $rootScope.globalLoading = true;

  //logging state changes
  $rootScope.$on('$stateChangeSuccess', function(){
    $log.info('state changed to: ' + arguments[1].name);
  });

}]);
