'use strict';

/*
 * task service: everything related to tasks
 * singleton!
 */

angular.module('icudo')
.service('TaskService', ['$q', '$firebase', '$routeParams', 'TimeService', '$log', '$filter', 'dataConfig', '$rootScope', '$location', 'toastr', 'UserService', function($q, $firebase, $routeParams, TimeService, $log, $filter, dataConfig, $rootScope, $location, toastr, UserService) {

  /* initialization */
  var self = this;
  this.user = UserService.user;
  this.tasks = getDayTasks(); 
  //holder for filtered and structured data to be given to the controller
  this.allTasks = {};

  this.defaultTaskObj = {
    name: "be happy",
    important: false,
    cool: false,
    urgent: false,
    status: "todo"
  };


  /* listen to collection load and update and refresh data (different subsets of tasks) accordingly */
  attachListeners(self.tasks);

  //add new task
  this.addNewTask = function(taskObj) {
    _.defaults(taskObj, self.defaultTaskObj);
    taskObj.createdAt = new Date().getTime();
    taskObj.updatedAt = new Date().getTime();
    self.tasks.$add(taskObj).then(function(ref){
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

  //toggle task attribute
  this.toggleTaskAttribute = function(id, attr) {
    var task = self.tasks.$child(id);
    task[attr] = !task[attr];
    task.$save().then(function(s){$log.log('task updated: '+id);}, function(e){$log.error(e);});
  };

  //fetch new tasks for a given date; if no date is given - then for today
  this.changeDate = function(date) {
    var deferred = $q.defer();
    self.tasks = getDayTasks(date); 
    $rootScope.globalLoading = true;
    self.tasks.$on('loaded', function(s) {
      attachListeners(self.tasks);
      $rootScope.globalLoading = false;
      deferred.resolve(true);
    }, function(e) {
      $log.error(e);
      deferred.reject(e);
    });
    return deferred.promise;
  };


  /* helper functions */

  //attach listeners
  function attachListeners(collection) {
    collection.$on('loaded', function(e) {
      refreshData();
      collection.$on('change', function(e){
        refreshData();
      });
    });
  }
  
  //update a task
  function updateTask(id, updateDataObj) {
    updateDataObj.updatedAt = new Date().getTime();
    self.tasks.$child(id).$update(updateDataObj).then(function(s){$log.log('task updated: '+id);},function(e){$log.error(e);});
  }

  //get tasks (resource) for a given day & user (optional)
  function getDayTasks(date, userId) {
    var ref = getRef(date, userId);
    return $firebase(ref);
  };

  //getRef given the optional date and userId
  function getRef(date, userId) {
    if(!userId) {
      userId = UserService.user.$id;
    }
    if(!date || !TimeService.validateDateString(date)) {
      date = getDate();
    }
    //this smells. may be doesn't belong here. better put it in the TimeService? but then it has a rootScope dependency? TODO: figure out.
    $rootScope.today = date;
    return new Firebase(dataConfig.firebaseBaseUrl+'/users/'+userId+'/tasks/'+date+'/');
  }

  function getDate() {
    if($routeParams.date) {
      return $routeParams.date;
    }
    return TimeService.getToday();
  }


  // reapply filters and reassign data
  var filteredTasks;
  function refreshData() {
    filteredTasks = $filter('tasksFilter')(self.tasks);
    self.allTasks.focus = filteredTasks.focus;
    self.allTasks.todo = filteredTasks.todo;
    self.allTasks.done = filteredTasks.done;
    $rootScope.$broadcast('tasksUpdated');
  }

}]);
