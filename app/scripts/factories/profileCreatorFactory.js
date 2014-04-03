'use strict';

angular.module('iuido')
  .factory('ProfileCreatorFactory', ['$firebase', '$q', '$log', 'dataConfig', function($firebase, $q, $log, dataConfig) { 
      var ProfileCreatorFactory = {};
      ProfileCreatorFactory.createProfile = function(uid, userObj) {
          $log.log(uid, userObj);
          var deferred = $q.defer();
          var u = $firebase(new Firebase(dataConfig.firebaseBaseUrl+'/users/'+uid));
          u.$set(userObj).then(function(){
              deferred.resolve(u);
          }, function(err){
              deferred.resolve(false);
              $log.log(err);
          });
          return deferred.promise;
      };
      return ProfileCreatorFactory;
  }])
