'use strict';

/* landing */

angular.module('icudo')
.controller('LandingController', ['$scope', '$rootScope', '$log', '$location', 'AuthFactory', 'TimeService', function ($scope, $rootScope, $log, $location, Auth, TimeService) {

  //if user authed - redirect to /ideas
  $scope.auth = Auth;
  $scope.auth.$getCurrentUser().then(function(){
    if(Auth.user) {
      var today = TimeService.getToday();
      $location.path('/'+today+'/todo/');
    } else {
      $rootScope.globalLoading = false;
    }
  });

}]);
