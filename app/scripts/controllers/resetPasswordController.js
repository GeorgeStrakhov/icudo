'use strict';

/* reset password - auth by email and toke in the secret url */

angular.module('icudo')
.controller('ResetPasswordController', ['$scope', '$rootScope', 'AuthFactory', 'UserService', '$log', '$location', '$stateParams', 'toastr', function($scope, $rootScope, Auth, UserService, $log, $location, $stateParams, toastr) {

  //initialization
  $scope.auth = Auth;

  $log.info($stateParams);

  if($stateParams.email && $stateParams.token) {

    $scope.oldUserPassword = $scope.oldPassword = $stateParams.token;
    $scope.auth.$login('password', {
      email: $stateParams.email,
      password: $stateParams.token
    }).then(function(user) {
      $rootScope.globalLoading = false;
      $scope.user = user;
      toastr.info('Please set your new password');
    }, function(rejectReason) {
      $log.error(rejectReason);
      $location.path('/');
      $location.url($location.path());
      toastr.error('Something doesn\'t look right, please try again');
    });
  } else {
    $location.path('/');
  }

  //change password
  $scope.changePassword = function() {
    if(!$scope.auth.user) {
      return false;
    }
    $scope.auth.$changePassword($scope.auth.user.email, $scope.oldPassword, $scope.newPassword).then(function(i) {
      toastr.success('New password set!');
      $scope.oldUserPassword = false;
      UserService.tryLogin($scope.auth.user.email, $scope.newPassword);
    },function(error){
      toastr.error('Oops, something doesn\'t look right. Check your old password and try again.');
    });
  };

}]);
