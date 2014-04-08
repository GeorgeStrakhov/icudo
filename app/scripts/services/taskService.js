'use strict';

/*
 * task service: everything related to tasks
 * singleton!
 */

angular.module('iuido')
.service('TaskService', ['$q', '$log', 'dataConfig', '$rootScope', '$location', 'toastr', 'TasksFactory', 'UserService', function($q, $log, dataConfig, $rootScope, $location, toastr, TasksFactory, UserService) {

    /* initialization */
    this.tasks = TasksFactory; 
    this.user = UserService.user;
    this.defaultTaskObj = {
        name: "be happy",
        important: false,
        urgent: false,
        interesting: false,
        status: "active"
    };
    var self = this;

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
    
    //mark task done
    this.markTaskDone = function(id) {
        updateTask(id, {"status":"done"});
    };

    //mark task skipped
    this.markTaskSkipped = function(id) {
        updateTask(id, {"status":"skipped"});
    };

    /* helper functions */

    function updateTask(id, updateDataObj) {
        updateDataObj.updatedAt = new Date().getTime();
        self.tasks.$child(id).$update(updateDataObj).then(function(s){$log.log('task updated: '+id);},function(e){$log.log(e);});
    }

}]);
