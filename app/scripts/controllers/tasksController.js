'use strict';

angular.module('icudo')
.controller('TasksController', ['$scope', 'TaskService', 'UserService', '$filter', '$log',  function($scope, TaskService, UserService, $filter, $log) {

    //initial data
    $scope.tasks = TaskService.tasks;
    $scope.activeTasks = $filter('matternessFilter')($scope.tasks, 'matterness');
    //we are doing this here and not in the view to eliminate unnecessary reevaluations
    $scope.tasks.$on('change', function(e){
        $scope.activeTasks = $filter('matternessFilter')($scope.tasks, 'matterness');
        $log.log($scope.activeTasks);
    });

    //get current user
    $scope.user = UserService.user;

    //add task
    $scope.addTask = function() {
        TaskService.addNewTask($scope.newTask);
        //clean up the input
        $scope.newTask = {};
    };

    //mark done
    $scope.markDone = function(id) {
        TaskService.markTaskDone(id);
    };

    //mark forgotten
    $scope.markForgotten = function(id) {
        TaskService.markTaskForgotten(id);
    };

    //update task name
    $scope.updateTaskName = function(id) {
        $log.log(id);
    };

}]);
