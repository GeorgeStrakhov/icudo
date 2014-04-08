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
    var tasks;
    var taskParams = ['important', 'cool', 'urgent'];
    return function(input) {
        //is the collection empty? return
        if(input.$getIndex().length < 1) return input;
        
        //ok, let's go on with filtering
        tasks = input;

        //first assign normal matterness to each task
        _.each(tasks, function(task) {
            task.matterness = 0;
            _.each(taskParams, function(what) {
                if(task[what]) {
                    task.matterness++;
                }
            });
        });

        //now sort by matterness
        var sortedNums = _.sortBy([2,6,1,7], function(n) {
            $log.log(n)
            return n;
        });
        $log.log(sortedNums);

        count++;
        $log.log('matterness filter used '+count+' times by now');
        return tasks; 
    };
}]);
