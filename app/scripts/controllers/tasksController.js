'use strict';

angular.module('icudo')
.controller('TasksController', ['$scope', 'TaskService', 'TimeService', 'UserService', '$location', '$log',  function($scope, TaskService, TimeService, UserService, $location, $log) {

  //initial data & binding on update; update event event is emitted from the taskService
  $scope.task = {};
  $scope.tasks = TaskService.allTasks;
  $scope.noTasksForToday = TaskService.allTasks.noTasksForToday;
  $scope.$on('tasksUpdated', function(){
    $scope.noTasksForToday = TaskService.allTasks.noTasksForToday;
  });

  //load yesterday's tasks that are still in todo
  TaskService.getYesterdaysActiveTasks().then(function(d){
    $scope.yesterdaysActiveTasks = d;
  });

  //get current user
  $scope.user = UserService.user;

  //add task
  $scope.saveTask = function(status) {
    $scope.task.status = (status == 'done') ? 'done' : 'todo';
    TaskService.addNewTask($scope.task);
    //clean input field and checkboxes
    $scope.task = {};
    $('#taskInput').focus();
  };

  //go to editing task
  $scope.goToEdit = function(id) {
    $location.path('/'+$scope.today+'/edit/'+id+'/');
  };

  //toggle attribute important / cool / urgent
  $scope.toggleTaskAttribute = function(id, attr) {
    TaskService.toggleTaskAttribute(id, attr);
  };

  //changestatus
  $scope.changeTaskStatus = function(id, status) {
    TaskService.changeTaskStatus(id, status);
  };

  //whether to show or not to show the alert about unfinished tasks from yesterday
  $scope.showYesterdaysTasks = function() {
    //show alert if a) there are some unfinished tasks from yesterday AND b) this is the first visit of today and c) we are on today's page, not on some other date's page
    if(_.size($scope.yesterdaysActiveTasks)>0 && $scope.user.firstVisitToday && $scope.today == TimeService.getToday()) {
      return true;
    }
  };
    
  //copy task from yesterday to today (and remove it from the list of Yesterday's unfinished tasks);
  $scope.copyTaskToToday = function(yTaskId) {
    var tObj = $scope.yesterdaysActiveTasks[yTaskId];
    TaskService.addNewTask(tObj, {notifySuccess: false});
    TaskService.removeYesterdaysTask(yTaskId);
  };

  //mark yesterdays task done
  $scope.markYesterdaysTaskDone = function(yTaskId) {
    TaskService.markYesterdaysTaskDone(yTaskId);
  };


  //forget yesterday i.e. stop the "unfinished from yesterday" dialouge from showing till tomorrow
  $scope.forgetYesterday = function() {
    UserService.user.firstVisitToday = false;
  };

}]);
