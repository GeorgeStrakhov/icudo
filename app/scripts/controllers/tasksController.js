'use strict';

angular.module('icudo')
.controller('TasksController', ['$scope', 'TaskService', 'UserService', '$location', '$log',  function($scope, TaskService, UserService, $location, $log) {

  //initial data & binding on update the event is emitted from the taskService
  
  $scope.$on('tasksUpdated', function(){
    $scope.tasks = TaskService.allTasks;
    $scope.today = TaskService.tasks.$id;
  });

  window.scope = $scope;
  //also listen to routeChange and location change since this controller is shared among a few views
  $scope.$on('$locationChangeSuccess', function(){
    //this is bad hack, but not sure how to deal wth it since routechange sometimes is not trigger in chrome if you change the url and hit enter...
    var newDate = $location.$$path.split('/')[2];
    TaskService.changeDate(newDate);
  });

  //get current user
  $scope.user = UserService.user;

  //add task
  $scope.addTask = function() {
    TaskService.addNewTask($scope.newTask);
    //clean up the input
    $scope.newTask = {};
  };

  //toggle attribute important / cool / urgent
  $scope.toggleTaskAttribute = function(id, attr) {
    TaskService.toggleTaskAttribute(id, attr);
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
