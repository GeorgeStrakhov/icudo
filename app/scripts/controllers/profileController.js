'use strict';

/* profile page and updating user settings */

angular.module('icudo')
.controller('ProfileController', ['$scope', 'UserService', '$log', function($scope, UserService, $log) {

  //get current user
  $scope.user = UserService.user;

  //update user settings
  $scope.updateUserSettings = function() {
    UserService.updateUserData($scope.auth.user.uid, $scope.user);
  };

}]);
