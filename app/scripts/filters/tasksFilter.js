'use strict';

/* 
 * Matterness filter: filters a collection of tasks by icudo metterness and returns an object, containing 3 things:
1) array of active tasks
2) array of done tasks
3) array of forgotten tasks

Filtering by metterness logic:
 * 1) general matterness = isImportant + isUrgent + isCool
 * 2) every day you have to do at least one cool, one important and one urgent (if they are present)
 *
 * How it works:
 * 1) assign general matterness
 * 2) check if there are one of each in the top 3
 * 3) if not => for each one that is not there:
 * 4) try to find the highest ranking one and up its matterness so that it finds its way to the top 3
 */

angular.module('icudo').filter('tasksFilter', ['$log', function($log) {
  var count = 0;
  var tasks = [];
  var filteredTasks = {};
  var taskParams = ['important', 'cool', 'urgent'];
  var taskStatuses = ['active', 'done', 'forgotten'];
  return function(input) {
    //is the collection empty? return
    if(input.$getIndex().length < 1) return input;

    //ok, let's go on with filtering
    tasks = [];
    filteredTasks = {};
    _.each(taskStatuses, function(s) {
      filteredTasks[s] = [];
    });

    //first assign normal matterness to each task
    _.each(input, function(task, key) {
      //we are iterating over an angularFire collection returned as an object, not an array. so need to make sure that we are not taking in the $ and $$ methods
      if(key.charAt(0) == '$') {
        return;
      }
      //inject the key into the object itself, so that we can use it later in the view
      task.id = key;
      //add matterness
      task.matterness = 0;
      _.each(taskParams, function(what) {
        if(task[what]) {
          task.matterness++;
        }
      });
      //now let's push the task to the right array depending on its status 
      if(task.status) filteredTasks[task.status].push(task);
    });
    
    /* active tasks extra logic */
    
    //sort active tasks matterness
    filteredTasks.active = _.sortBy(filteredTasks.active, function(task) {
      return task.matterness
    }).reverse();
    
    //make sure there is at least one task of each type (urgent, cool, important) in the top 3 of active tasks

    //for active tasks add focus: true to the top 3 tasks so that we can highlight them
    _.each(filteredTasks.active, function(task,i) {
      filteredTasks.active[i].focus = (i < 3) ? true : false;
    });

    count++;
    $log.log('matterness filter used '+count+' times by now');
    return filteredTasks; 
  };
}]);
