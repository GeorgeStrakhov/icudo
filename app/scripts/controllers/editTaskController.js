'use strict';

/* controller to edit a task */

angular.module('icudo')
.controller('EditTaskController', ['$scope', 'TaskService','$routeParams', '$log',  function($scope, TaskService, $routeParams, $log) {
  
  //load the task to be edited via uid from the routeparams
  var taskId = $routeParams.task;
  $scope.task = TaskService.getTaskById(taskId);

  //save edit task
  $scope.saveTask = function() {
    TaskService.updateTask($scope.task.$id, $scope.task, true); //true for redirecting to today
  };

  //save to done
  $scope.saveToDone = function() {
    $scope.task.status = "done";
    $scope.saveTask();
  };

}]);
