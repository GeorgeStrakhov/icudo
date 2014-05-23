'use strict';

angular.module('icudo')
.controller('LoginSignupController', ['$scope', '$rootScope', 'UserService', '$log', function($scope, $rootScope, UserService, $log) {

  //initialization
  $scope.recoveringPassword = false;
  $rootScope.globalLoading = false;

  //login
  $scope.tryLogin = function() {
    UserService.tryLogin($scope.userEmail, $scope.userPassword);
  };

  //toggle recovering password
  $scope.toggleRecoveringPassword = function() {
    $scope.recoveringPassword = !$scope.recoveringPassword;
  };

  //recover password
  $scope.recoverPassword = function() {
    UserService.recoverPassword($scope.userEmail); 
    $scope.recoveringPassword = false;
  };

  //signup
  $scope.signup = function() {
    var newUser = {
      "email": $scope.newUserEmail,
      "name": $scope.newUserName,
    };
    UserService.signup(newUser);
  };

}]);
