'use strict';

/*
 * user service: everything related to users
 */

angular.module('icudo')
.service('UserService', ['$q', '$log', '$firebase', 'AuthFactory', 'ProfileCreatorFactory', 'StatsService', 'TimeService', 'dataConfig', '$rootScope', '$location', 'toastr', function($q, $log, $firebase, AuthFactory, ProfileCreatorFactory, StatsService, TimeService, dataConfig, $rootScope, $location, toastr) {

  var Auth = AuthFactory;
  var self = this;

  //subscribe to events
  $rootScope.$on("$firebaseSimpleLogin:login", function(e, user) {
    $log.log('login!');
    self.user = $firebase(new Firebase(dataConfig.firebaseBaseUrl+'/users/'+user.uid));
    self.user.$on('loaded', function(){
      //set allLoaded flag
      $rootScope.allLoaded = true;
      //check if it's the first login for today; if yes - show unfinished from yesterday prompt
      if(checkFirstLoginToday(self.user)) {
        self.user.firstVisitToday = true;
      }
      //log last login
      logLastLoginTime(self.user); 
    });
  });

  $rootScope.$on("$firebaseSimpleLogin:logout", function(e) {
    $log.log('logout!');
    self.user = undefined;
  });

  this.updateUserData = function(id, userObj) {
    self.user.$update(userObj).then(function(){
      //make sure the value in this singleton stays fresh
      toastr.success('Settings updated!');
    }, function(error) {
      toaster.error(error);
    });
  };

  this.tryLogin = function(email, password) {
    Auth.$login('password', {
      email: email,
      password: password
    }).then(function(user) {
      //if there is a route to which we should redirect
      if($rootScope.goToNext) {
        $location.path($rootScope.goToNext);
        $rootScope.goToNext = false;
      } else {
        //default route to go to 
        $location.path('/do');
      }
      toastr.success('Welcome back!');
    }, function(error) {
      toastr.error('Something doesn\'t look right, please check and try again');
    });
  };

  this.logout = function() {
    Auth.$logout();
    toastr.success('Farewell!');
  };

  this.recoverPassword = function(email) {
    Auth.$sendPasswordResetEmail(email);
    $location.path('/');
    toastr.success('Please check your email, we sent instructions your way!');
  };

  this.signup = function(newUser) {
    //this is an ugly callback hell nightmare. ToDo: refactor
    Auth.$createUser(newUser.email, 'tempPass2014', true).then(function(newUserObj) {
      //login he newly created user first
      Auth.$login('password', {
        email: newUser.email,
        password: 'tempPass2014'
      })
      .then(function(user){
        //we are hacking for better userflow, setting temp password and instantly sending a reovery email with a token and a link for the user to set a real password
        //create a record for the new user
        ProfileCreatorFactory.createProfile(newUserObj.uid, newUser).then(function(userObj) {
          //then send password reset email with a token
          Auth.$sendPasswordResetEmail(newUser.email).then(function(){
            Auth.$logout();
            $location.path('/');
            toastr.success('Thank you! We\'ve sent an email with further instructions your way.');
          }, function(err){
            $log.log(err);
            toastr.error('Sorry, there was an error.');
          });
        });
      });
    },
      function(reason){
        toastr.error(reason.code);
      });
  };

  /* helper functions */

  function logLastLoginTime(userObj) {
    var now = new Date().getTime();
    userObj.$child('metaData').$update({
      lastLoginTime: now
    });
  }

  function checkFirstLoginToday(userObj) {
    var todayDate = TimeService.getToday();
    var lastLoginDate = TimeService.formatTimestamp(userObj.metaData.lastLoginTime);
    return !(todayDate == lastLoginDate);
  }

}]);
