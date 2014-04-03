'use strict';

angular.module('iuido')
.controller('TasksController', ['$scope', 'TaskService', 'UserService', '$log',  function($scope, TaskService, UserService, $log) {

    //initial data
    $scope.tasks = TaskService.tasks;
    $scope.isLoaded = false;

    //get current user
    $scope.user = UserService.user;

    //loaded
    $scope.tasks.$on('loaded', function() {
        $scope.isLoaded = true;
    });

    //add task
    $scope.addTask = function() {
        TaskService.addNewTask($scope.newTask);
        $scope.newTask = {};
    };

}]);
