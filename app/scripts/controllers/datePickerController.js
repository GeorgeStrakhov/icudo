'use strict';

angular.module('icudo')
  .controller('DatePickerController', ["$scope", "$log", "$location", 'TimeService', function ($scope, $log, $location, TimeService) {

    $scope.dt = new Date();

    $scope.$watch('dt', function(e) {
      var date = TimeService.formatDate($scope.dt);
      $scope.$emit('changeDate', date);
    });

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };

  }]);
