'use strict';

/*
 * factory ideas resource
 */

angular.module('icudo')
.factory ('TasksFactory', ['$firebase', '$rootScope', 'dataConfig', 'UserService', '$log', function($firebase, $rootScope, dataConfig, UserService, $log) {
    var user = UserService.user;
    var ref = new Firebase(dataConfig.firebaseBaseUrl+'/users/'+user.$id+'/tasks');
    return $firebase(ref);
}]);
