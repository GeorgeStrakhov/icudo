'use strict';

angular.module('icudo')
.controller('TasksController', ['$scope', 'TaskService', 'TimeService', 'UserService', '$location', '$routeParams', '$log',  function($scope, TaskService, TimeService, UserService, $location, $routeParams, $log) {

  //before everything else let's make sure that we have a date in the url (#/do/2014-12-12). else => redirect to today's date
  var today = $routeParams.date;
  if(!TimeService.validateDateString(today)) {
    redirectToToday();
  }

  //initial data & binding on update the event is emitted from the taskService
  $scope.tasks = TaskService.allTasks;
  $scope.$on('tasksUpdated', function(){
    $scope.tasks = TaskService.allTasks;
  });

  //load yesterday's tasks that are still in todo
  TaskService.getYesterdaysActiveTasks().then(function(d){
    $scope.yesterdaysActiveTasks = d;
  });

  //get current user
  $scope.user = UserService.user;

  //add task
  $scope.addTask = function() {
    TaskService.addNewTask($scope.newTask);
    //clean up the input
    $scope.newTask = {};
  };

  //go to editing task
  $scope.goToEdit = function(id) {
    $location.path('/do/'+today+'/edit/'+id);
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

  //forget yesterday i.e. stop the "unfinished from yesterday" dialouge from showing till tomorrow
  $scope.forgetYesterday = function() {
    UserService.user.firstVisitToday = false;
  };

  /* helper functions */
  function redirectToToday() {
    var today = TimeService.getToday();
    redirectToDate(today);
  }
  
  function redirectToDate(dateString) {
    //this is not good. there is duplication. we should use taskservice to do it like with the datepicker. TODO: clean up
    $location.path('do/'+dateString);
  }

}]);
