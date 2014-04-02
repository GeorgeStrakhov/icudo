'use strict';

angular.module('iuido')
    .controller('UsersController', ['$scope', 'UserService', '$log', function($scope, UserService, $log) {

        //initialization
        $scope.recoveringPassword = false;
        //get current user
        $scope.user = UserService.user;
        
        //login
        $scope.tryLogin = function() {
            UserService.tryLogin($scope.userEmail, $scope.userPassword);
        };

        //logout
        $scope.logout = function() {
            UserService.logout();
        };

        //toggle recovering password
        $scope.toggleRecoveringPassword = function() {
            $scope.recoveringPassword = !$scope.recoveringPassword;
        };

        //recover password
        $scope.recoverPassword = function() {
            UserService.recoverPassword($scope.userEmail); 
        };

        //update user settings
        $scope.updateUserSettings = function() {
            UserService.updateUserData($scope.auth.user.uid, $scope.user);
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
