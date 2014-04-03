'use strict';

angular.module('iuido')
    .controller('ChangePasswordController', ['$scope', '$rootScope', 'AuthFactory', 'UsersFactory', 'UserService', '$log', '$location', '$route', '$routeParams', 'dataConfig', 'toastr', function($scope, $rootScope, Auth, Users, UserService, $log, $location, $route, $routeParams, dataConfig, toastr) {
        
        //initialization
        $scope.auth = Auth;
        $scope.users = Users;

        //process on initizalization: token based one time login
        $scope.auth.$getCurrentUser().then(function(user) {
            $scope.user = user;
            var queryString = $location.search();
            if (!user && !queryString.email) {
                $location.path('/login');
                return;
            }
            if(queryString.email && queryString.token) {
                $scope.oldUserPassword = $scope.oldPassword = queryString.token;
                $scope.auth.$login('password', {
                    email: queryString.email,
                    password: queryString.token
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
