'use strict';

/* 
 * Matterness filter: filters a collection of tasks by icudo metterness:
 * 1) general matterness = isImportant + isUrgent + isCool
 * 2) every day you have to do at least one cool, one important and one urgent (if they are present)
 *
 * How it works:
 * 1) assign general matterness
 * 2) check if there are one of each in the top 3
 * 3) if not => for each one that is not there:
 * 4) try to find the highest ranking one and up its matterness so that it finds its way to the top 3
 */

angular.module('icudo').filter('matternessFilter', ['$log', function($log) {
  var count = 0;
  var tasks = [];
  var taskParams = ['important', 'cool', 'urgent'];
  return function(input) {
    //is the collection empty? return
    if(input.$getIndex().length < 1) return input;

    //ok, let's go on with filtering
    tasks = [];

    //first assign normal matterness to each task
    _.each(input, function(task, key) {
      //we are iterating over an angularFire collection returned as an object, not an array. so need to make sure that we are not taking in the $ and $$ methods
      if(key.charAt(0) == '$') {
        return;
      }
      //now let's get rid of the tasks that are not active
      if(task.status != 'active') {
        return;
      }
      //add matterness
      task.matterness = 0;
      task.id = key;
      _.each(taskParams, function(what) {
        if(task[what]) {
          task.matterness++;
        }
      });
      //push into the array
      tasks.push(task);
    });
    
    //sort by matterness
    tasks = _.sortBy(tasks, function(task) {
      return task.matterness
    }).reverse();

    //add focus: true to the top 3 tasks so that we can highlight them
    _.each(tasks, function(task,i) {
      tasks[i].focus = (i < 3) ? true : false;
    });

    count++;
    $log.log('matterness filter used '+count+' times by now');
    return tasks; 
  };
}]);
