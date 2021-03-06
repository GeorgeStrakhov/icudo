'use strict';

/* controller to add tasks */

angular.module('icudo')
.controller('AddTaskController', ['$scope', 'TaskService', '$log',  function($scope, TaskService, $log) {

  //initiate
  $scope.task = {};
  
  //add task
  $scope.saveTask = function(status) {
    $scope.task.status = (status == 'done') ? 'done' : 'todo';
    TaskService.addNewTask($scope.task, {redirectToAllTasks: true}); //true for then redirecting to the date
  };

}]);
