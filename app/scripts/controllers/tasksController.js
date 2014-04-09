'use strict';

angular.module('icudo')
.controller('TasksController', ['$scope', 'TaskService', 'UserService', '$log',  function($scope, TaskService, UserService, $log) {

    //initial data & binding on update the event is emitted from the taskService
    $scope.$on('tasksUpdated', function(){
      $scope.tasks = TaskService.allTasks;
    });
    //also listen to routeChange since this controller is shared among a few views
    $scope.$on('$routeChangeSuccess', function(){
      $scope.tasks = TaskService.allTasks;
    });

    //get current user
    $scope.user = UserService.user;

    //add task
    $scope.addTask = function() {
        TaskService.addNewTask($scope.newTask);
        //clean up the input
        $scope.newTask = {};
    };

    //changestatus
    $scope.changeTaskStatus = function(id, status) {
        TaskService.changeTaskStatus(id, status);
    };

    //update task name
    $scope.updateTaskName = function(id) {
        $log.log(id);
        $log.error('not implemented yet!');
    };

}]);
