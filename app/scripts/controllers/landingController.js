'use strict';

angular.module('icudo')
  .controller('LandingController', ["$scope", "$log", "$location", "AuthFactory", function ($scope, $log, $location, Auth) {

    //if user authed - redirect to /ideas
    $scope.auth = Auth;
    $scope.auth.$getCurrentUser().then(function(){
            if(Auth.user) {
                $location.path('/do');
            }
        });

  }]);
