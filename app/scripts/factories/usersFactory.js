'use strict';

angular.module('iuido')
.factory ('UsersFactory', ['$firebase', '$rootScope', 'dataConfig', function($firebase, $rootScope, dataConfig) {
    var usersRef = new Firebase(dataConfig.firebaseBaseUrl+'/users');
    return $firebase(usersRef);
}]);
