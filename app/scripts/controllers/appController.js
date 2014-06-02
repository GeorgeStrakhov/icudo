'use strict';

angular.module('icudo')
.controller('AppController', ['$scope', 'TimeService', 'AuthFactory', 'UserService', '$window', '$log', function($scope, TimeService, Auth, UserService, $window, $log) {

  //get current user
  $scope.user = UserService.user;
  $scope.auth = Auth;
  
  //set current date
  $scope.currentDate = TimeService.getToday();

  //go back
  $scope.goBack = function() {
    $window.history.back();
  };

  //logout
  $scope.logout = function() {
    UserService.logout();
  };

}]);
