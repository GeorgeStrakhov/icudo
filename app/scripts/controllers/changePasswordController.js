'use strict';

angular.module('icudo')
    .controller('ChangePasswordController', ['$scope', 'AuthFactory', 'UserService', '$log', 'toastr', function($scope, Auth, UserService, $log, toastr) {
        
        //initialization
        $scope.auth = Auth;

        //change password
        $scope.changePassword = function() {
            if(!$scope.auth.user) {
                return false;
            }
            $scope.auth.$changePassword($scope.auth.user.email, $scope.oldPassword, $scope.newPassword).then(function(i) {
                toastr.success('New password set!');
                UserService.tryLogin($scope.auth.user.email, $scope.newPassword);
            },function(error){
                toastr.error('Oops, something doesn\'t look right. Check your old password and try again.');
            });
        };

    }]);
