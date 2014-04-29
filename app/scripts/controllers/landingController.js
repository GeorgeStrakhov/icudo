'use strict';

/* landing */

angular.module('icudo')
.controller('LandingController', ['$scope', '$rootScope', '$log', '$location', 'AuthFactory', function ($scope, $rootScope, $log, $location, Auth) {

  //if user authed - redirect to /ideas
  $scope.auth = Auth;
  $scope.auth.$getCurrentUser().then(function(){
    if(Auth.user) {
      $location.path('/do');
    } else {
      $rootScope.globalLoading = false;
    }
  });

}]);
