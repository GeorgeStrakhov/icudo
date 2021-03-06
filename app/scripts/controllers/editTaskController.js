'use strict';

/* controller to edit a task */

angular.module('icudo')
.controller('EditTaskController', ['$scope', 'TaskService','$stateParams', '$log',  function($scope, TaskService, $stateParams, $log) {
  
  //load the task to be edited via uid from the routeparams
  var taskId = $stateParams.task;
  $scope.task = TaskService.getTaskById(taskId);

  //save edit task
  $scope.saveTask = function(status) {
    $scope.task.status = (status == 'done') ? 'done' : 'todo';
    TaskService.updateTask($scope.task.$id, $scope.task, true); //true for redirecting to today
  };

}]);
