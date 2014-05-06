'use strict';

/*
 * security service: checking auth rights for routes and listening to rejections
 */

angular.module('icudo')
.factory('SecurityService', ['$q', '$log', 'AuthFactory', function($q, $log, Auth) {
  var Security = {
    check: function() {
      var response = $q.defer();
      Auth.$getCurrentUser().then(function(){
        if(Auth.user) {
          response.resolve(true);
        } else {
          response.reject('You need to log in to see this page');
        }
      });
      return response.promise;
    }
  };
  return Security;
}])
.run(['$rootScope', '$location', '$state', '$log', function($rootScope, $location, $state, $log) {
  
  $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
    $log.info('state changed!');
    $log.info(toParams);
  });

  //on location that requires auth - save goToNext to rootscope and redirect to login
  $rootScope.$on('$stateChangeError', function(rejection, toState, stateParams, redirectingToState, smth, rejectionReason) {
    if(rejectionReason) {
      $rootScope.goToNext = {
        to: toState.name,
        toParams: stateParams
      };
      $state.go('login');
      $rootScope.$broadcast('notification', {
        message: rejectionReason,
        type: 'error'
      });
    }
  });

}]);
