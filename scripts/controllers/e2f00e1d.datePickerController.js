'use strict';

angular.module('icudo')
  .controller('DatePickerController', ['$scope', '$log', '$state', 'TimeService', function ($scope, $log, $state, TimeService) {

    var today = ($scope.today) ? $scope.today : TimeService.getToday();
    
    $scope.dt = new Date(today);

    $scope.$watch('dt', function(e) {
      var date = TimeService.formatDate($scope.dt);
      if(date == $scope.today) return; //fix to prevent unnecessary jumping around
      $state.go('date.todo', {date: date}); 
      $scope.$emit('changeDate', date);
    });

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };

  }]);
