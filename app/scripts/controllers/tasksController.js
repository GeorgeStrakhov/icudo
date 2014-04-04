'use strict';

angular.module('iuido')
.controller('TasksController', ['$scope', 'TaskService', 'UserService', '$log',  function($scope, TaskService, UserService, $log) {

    //initial data
    $scope.tasks = TaskService.tasks;

    //get current user
    $scope.user = UserService.user;

    //add task
    $scope.addTask = function() {
        TaskService.addNewTask($scope.newTask);
        //clean up the input
        $scope.newTask = {};
    };

    //mar done
    $scope.markDone = function(id) {
        TaskService.markTaskDone(id);
    };

}]);
