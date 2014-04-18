'use strict';

/*
 * task service: everything related to tasks
 * singleton!
 */

angular.module('icudo')
.service('TaskService', ['$q', '$timeout', '$firebase', '$routeParams', 'TimeService', '$log', '$filter', 'dataConfig', '$rootScope', '$location', 'toastr', 'UserService', function($q, $timeout, $firebase, $routeParams, TimeService, $log, $filter, dataConfig, $rootScope, $location, toastr, UserService) {

  /* initialization */
  var justChangedLocation = false;
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


  //listen to collection load and update and refresh data (different subsets of tasks) accordingly
  attachListeners(self.tasks);

  //listen to the diffirent controllers emitting changeDate event!
  $rootScope.$on('changeDate', function(e, newDate) {
    self.changeDate(newDate, true); //passing true to also update the location
  });
  

  //also listen to location change since the user may manually edit the url in the url bar
  $rootScope.$on('$locationChangeSuccess', function(){
    //this is bad hack, but not sure how to deal wth it since routechange sometimes is not trigger in chrome if you change the url and hit enter...
    if(!justChangedLocation)
    {
      var newDate = $location.$$path.split('/')[2];
      self.changeDate(newDate);
    }
    //debounce to avoid multiple calls and expensive filtering calculations
    $timeout(function(){
      justChangedLocation = false;
    }, 200);
  });

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
  this.changeDate = function(date, shouldUpdateLocation) {
    var deferred = $q.defer();
    self.tasks = getDayTasks(date); 
    $rootScope.globalLoading = true;
    self.tasks.$on('loaded', function(s) {
      attachListeners(self.tasks);
      $rootScope.globalLoading = false;
      if(shouldUpdateLocation) {
        updateLocation();
        justChangedLocation = true;
      }
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


  //bring url in sync with current collection
  function updateLocation() {
    var newDate = self.tasks.$id;
    $location.path('do/'+newDate);
  }


  // reapply filters and reassign data
  var filteredTasks;
  //debouncing filtering to avoid expensive calculations. this is a hack. need to understand why without it filtering is sometimes redone multiple times per update. TODO: unhack;
  var justFiltered = false
  function refreshData() {
    if(!justFiltered) {
      filteredTasks = $filter('tasksFilter')(self.tasks);
      self.allTasks.focus = filteredTasks.focus;
      self.allTasks.todo = filteredTasks.todo;
      self.allTasks.done = filteredTasks.done;
      $rootScope.$broadcast('tasksUpdated');
    }
    justFiltered = true;
    $timeout(function(){justFiltered = false;},200);
  }

}]);
