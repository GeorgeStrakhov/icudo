'use strict';

/* 
 * Matterness filter: filters a collection of tasks by icudo metterness and returns an object, containing 4 arrays:
 * 1) array of focus tasks
 * 2) array of todo tasks
 * 3) array of done tasks
 * 4) array of forgotten tasks

 * Focus logic:
 * 1) general matterness = isImportant + isUrgent + isCool
 * 2) every day you have to do at least one cool, one important and one urgent (if they are present)
 */

angular.module('icudo').filter('tasksFilter', ['$log', function($log) {
  var count = 0;
  var tasks = [];
  var filteredTasks = {};
  var taskParams = ['important', 'cool', 'urgent'];
  var taskStatuses = ['todo', 'done'];
  var filterFunction = function(input) {
    //is the collection empty? return
    if(input.$getIndex().length < 1) return input;

    //ok, let's go on with filtering
    tasks = [];
    filteredTasks = {};
    _.each(taskStatuses, function(s) {
      filteredTasks[s] = [];
    });
    //focus will be a separate array
    filteredTasks.focus = [];

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
    
    /* todo tasks extra logic */
    
    //sort todo tasks matterness
    filteredTasks.todo = _.sortBy(filteredTasks.todo, function(task) {
      return task.matterness;
    }).reverse();
    
    //pick the top three for focus based on a logic that there has to be at least 1 of each (important, cool, urgent) 
    _.each(taskParams, function(what) {
      var singleParamTasks = _.filter(filteredTasks.todo, function(task) {return task[what] == true});
      var found = false;
      _.each(singleParamTasks, function(t) {
        if(!found) {
          found = true;
          if(_.indexOf(filteredTasks.focus, t) < 0) {
            filteredTasks.focus.push(t);
          }
        }
      });
    });

    //make sure that there are at least 3 tasks to focus on, even if rules do not match
    //TODO: this is ugly. refactor
    for (var z=0; z<3; z++) {
      if(filteredTasks.focus.length < 3 && filteredTasks.todo.length > 0) {
        if(_.indexOf(filteredTasks.focus, filteredTasks.todo[z]) < 0) {
          if(filteredTasks.todo[z]) {
            filteredTasks.focus.push(filteredTasks.todo[z]);
          }
        }
      }
    }

    //now get rid of duplication: remove the tasks that are in the focus from the list of todo tasks
    filteredTasks.todo = _.difference(filteredTasks.todo, filteredTasks.focus);

    //finally sort focus by matterness
    filteredTasks.focus = _.sortBy(filteredTasks.focus, function(task) {
      return task.matterness;
    }).reverse();

    /* done tasks extra logic */

    //sort by last updated (newer first)
    filteredTasks.done = _.sortBy(filteredTasks.done, function(task) {
      return task.updatedAt;
    }).reverse();
    
    //add a formatted updated date to done tasks
    _.each(filteredTasks.done, function(task) {
      task.dateUpdated = moment(task.updatedAt).format("YYYY.MM.DD");
    });

    count++;
    $log.log('matterness filter used '+count+' times by now');
    return filteredTasks; 
  };

  return filterFunction;

}]);
