'use strict';

/*
 * user service: everything related to users
 */

angular.module('icudo')
.service('UserService', ['$q', '$log', '$firebase', 'AuthFactory', 'ProfileCreatorFactory', 'StatsService', 'TimeService', 'dataConfig', '$rootScope', '$location', '$state', 'toastr', function($q, $log, $firebase, AuthFactory, ProfileCreatorFactory, StatsService, TimeService, dataConfig, $rootScope, $location, $state, toastr) {

  var Auth = AuthFactory;
  var self = this;

  //subscribe to events
  $rootScope.$on("$firebaseSimpleLogin:login", function(e, user) {
    $log.log('login!');
    $rootScope.globalLoading = true;
    self.user = $firebase(new Firebase(dataConfig.firebaseBaseUrl+'/users/'+user.uid));
    self.user.$on('loaded', function(){
      //loading flag to loaded
      $rootScope.globalLoading = false;
      //check if it's the first login for today; if yes - show unfinished from yesterday prompt
      if(checkFirstLoginToday(self.user)) {
        self.user.firstVisitToday = true;
      }
      //log last login
      logLastLoginTime(self.user); 
    });
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
    $rootScope.globalLoading = true;
    Auth.$login('password', {
      email: email,
      password: password
    }).then(function(user) {
      //if there is a route to which we should redirect
      if($rootScope.goToNext) {
        var goToNext = $rootScope.goToNext;
        $rootScope.goToNext = false;
        $state.go(goToNext.to, goToNext.toParams);
      } else {
        //default route to go to 
        $location.path('/');
      }
      toastr.success('Welcome back!');
    }, function(error) {
      $log.log(error);
      $rootScope.globalLoading = false;
      toastr.error('Something doesn\'t look right, please check and try again');
    });
  };

  this.logout = function() {
    $log.log('logout!');
    $location.path('/');
    Auth.$logout();
    self.user = undefined;
    $rootScope.globalLoading = false;
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
    var lastLoginDate = (userObj.metaData) ? TimeService.formatTimestamp(userObj.metaData.lastLoginTime) : todayDate;
    return !(todayDate == lastLoginDate);
  }

}]);
