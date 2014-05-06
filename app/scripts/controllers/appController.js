'use strict';

angular.module('icudo')
.controller('AppController', ['$scope', 'AuthFactory', 'UserService', '$window', '$log', function($scope, Auth, UserService, $window, $log) {

 //get current user
  $scope.user = UserService.user;
  $scope.auth = Auth;

  //go back
  $scope.goBack = function() {
    $window.history.back();
  };

  //logout
  $scope.logout = function() {
    UserService.logout();
  };

}]);
