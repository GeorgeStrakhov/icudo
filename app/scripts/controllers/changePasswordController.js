'use strict';

angular.module('icudo')
    .controller('ChangePasswordController', ['$scope', '$rootScope', 'AuthFactory', 'UserService', '$log', '$location', '$route', '$routeParams', 'dataConfig', 'toastr', function($scope, $rootScope, Auth, UserService, $log, $location, $route, $routeParams, dataConfig, toastr) {
        
        //initialization
        $scope.auth = Auth;

        //process on initizalization: token based one time login
        $scope.auth.$getCurrentUser().then(function(user) {
            $scope.user = user;
            if (!user && !$routeParams.email) {
                $location.path('/login');
                return;
            }
            if($routeParams.email && $routeParams.token) {
                $scope.oldUserPassword = $scope.oldPassword = $routeParams.token;
                $scope.auth.$login('password', {
                    email: $routeParams.email,
                    password: $routeParams.token
                }).then(function(user) {
                    $scope.user = user;
                    toastr.info('Please set your new password');
                }, function(rejectReason) {
                    $location.path('/');
                    $location.url($location.path());
                    toastr.error('Something doesn\'t look right, please try again');
                });
            }
        });

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
