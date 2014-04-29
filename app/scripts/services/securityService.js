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
  .run(['$rootScope', '$location', '$log', '$route', 'dataConfig', function($rootScope, $location, $log, $route, dataConfig) {

      //on location that requires auth - save goToNext to rootscope and redirect to login
      $rootScope.$on('$routeChangeError', function(rejection, newPath, oldPath, rejectionReason) {
          if(rejectionReason) {
              $rootScope.goToNext = $location.path();
              $log.log($rootScope.goToNext);
              $location.path('/login');
              $rootScope.$broadcast('notification', {
                  message: rejectionReason,
                  type: 'error'
              });
          }
      });

      //on logout - go to landing page
      $rootScope.$on('$firebaseSimpleLogin:logout', function(){
          //one corner case is if we are entering the app from a tokenized auth link.
          if($location.path().indexOf("token") > -1) {
              return;
          }
          $location.path('/');
      });
  }]);
