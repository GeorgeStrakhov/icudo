'use strict';

/* controller to add tasks */

angular.module('icudo')
.controller('AddTaskController', ['$scope', 'TaskService', '$log',  function($scope, TaskService, $log) {

  //add task
  $scope.saveTask = function() {
    TaskService.addNewTask($scope.task, true); //true for then redirecting to the date
  };

  //save to done
  $scope.saveToDone = function() {
    $scope.task.status = "done";
    $scope.saveTask();
  };

}]);
