'use strict';

/*
 * factory for stats
 */

angular.module('icudo')
.factory ('StatsFactory', ['$firebase', 'dataConfig', '$log', function($firebase, dataConfig, $log) {
    var ref = new Firebase(dataConfig.firebaseBaseUrl+'/appData/stats');
    return $firebase(ref);
}]);
