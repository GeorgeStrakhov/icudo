'use strict';

angular.module('icudo')
  .controller('MainController', ["$scope", "$log", 'AuthFactory', function ($scope, $log, Auth) {
    
    //Auth
    $scope.auth = Auth;
  
  }]);
