'use strict';

/*
 * factory ideas resource
 */

angular.module('iuido')
.factory ('TasksFactory', ['$firebase', '$rootScope', 'dataConfig', function($firebase, $rootScope, dataConfig) {
    var ref = new Firebase(dataConfig.firebaseBaseUrl+'/tasks');
    return $firebase(ref);
}]);
