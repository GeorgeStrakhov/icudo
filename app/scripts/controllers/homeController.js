'use strict';

angular.module('iuido')
  .controller('MainController', ["$scope", "$log", 'AuthFactory', function ($scope, $log, Auth) {
    
    //Auth
    $scope.auth = Auth;

    //top level scope data e.g. current user etc.
  
  }]);
