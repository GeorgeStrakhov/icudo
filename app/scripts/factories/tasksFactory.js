'use strict';

/*
 * factory ideas resource
 */

angular.module('icudo')
.factory ('TasksFactory', ['$firebase', 'dataConfig', 'UserService', '$log', function($firebase, dataConfig, UserService, $log) {
    var user = UserService.user;
    var ref = new Firebase(dataConfig.firebaseBaseUrl+'/users/'+user.$id+'/tasks');
    return $firebase(ref);
}]);
