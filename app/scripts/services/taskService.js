'use strict';

/*
 * task service: everything related to tasks
 * singleton!
 */

angular.module('icudo')
.service('TaskService', ['$q', '$log', '$filter', 'dataConfig', '$rootScope', '$location', 'toastr', 'TasksFactory', 'UserService', function($q, $log, $filter, dataConfig, $rootScope, $location, toastr, TasksFactory, UserService) {

  /* initialization */
  this.tasks = TasksFactory; 
  //holder for filtered and structured data to be given to the controller
  this.allTasks = {};

  this.user = UserService.user;
  this.defaultTaskObj = {
    name: "be happy",
    important: false,
    cool: false,
    urgent: false,
    status: "active"
  };

  var self = this;

  /* listen to collection load and update and refresh data (different subsets of tasks) accordingly */

  this.tasks.$on('loaded', function(e) {
    refreshData();
    self.tasks.$on('change', function(e){
      refreshData();
    });
  });


  //add new task
  this.addNewTask = function(taskObj) {
    _.defaults(taskObj, self.defaultTaskObj);
    taskObj.createdAt = new Date().getTime();
    taskObj.updatedAt = new Date().getTime();
    TasksFactory.$add(taskObj).then(function(ref){
      $log.log('task added: '+ref.name());
    }, function(err){
      toastr.error(err.code);
      $log.log(err);
    });
  };

  //change task status
  this.changeTaskStatus = function(id, newStatus) {
    updateTask(id, {"status" : newStatus});
  };

  /* helper functions */

  function updateTask(id, updateDataObj) {
    updateDataObj.updatedAt = new Date().getTime();
    self.tasks.$child(id).$update(updateDataObj).then(function(s){$log.log('task updated: '+id);},function(e){$log.log(e);});
  }

  // reapply filters and reassign data
  var filteredTasks;
  function refreshData() {
    filteredTasks = $filter('tasksFilter')(self.tasks);
    self.allTasks.active = filteredTasks.active;
    self.allTasks.done = filteredTasks.done;
    self.allTasks.forgotten = filteredTasks.forgotten;
    $rootScope.$broadcast('tasksUpdated');
  }

}]);
