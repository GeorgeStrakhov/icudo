'use strict';

/*
 * user service: everything related to users
 * singleton!
 */

angular.module('iuido')
.service('UserService', ['$q', '$log', 'AuthFactory', 'UsersFactory', 'dataConfig', '$rootScope', '$location', 'toastr', function($q, $log, AuthFactory, UsersFactory, dataConfig, $rootScope, $location, toastr) {

        var Auth = AuthFactory;
        var Users = UsersFactory;
        var self = this;
        
        //set the user in this singleton if it's not set
        getUserViaId().then(function(u){
            self.user = (self.user) ? self.user : u;
        });

        this.updateUserData = function(id, userObj) {
           //this is a bit ugly; there has to be a better way. but works for now. ToDo: recreate!
           var updatedUser = {};
           updatedUser[id] = userObj;
           UsersFactory.$update(updatedUser).then(function(){
               //make sure the value in this singleton stays fresh
               refreshUserObj();
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
               //create userObj and make it available
               refreshUserObj();
               //if there is a route to which we should redirect
               if($rootScope.goToNext) {
                   $location.path($rootScope.goToNext);
                   $rootScope.goToNext = false;
               } else {
                   //default route to go to 
                   $location.path('/tasks');
               }
               toastr.success('Welcome back!');
            }, function(error) {
                toastr.error('Something doesn\'t look right, please check and try again');
            });
        };

        this.logout = function() {
            Auth.$logout();
            self.user = false;
            toastr.success('Farewell!');
        };
        
        this.recoverPassword = function(email) {
            Auth.$sendPasswordResetEmail(userEmail);
            $location.path('/');
            toastr.success('Please check your email, we sent instructions your way!');
        };

        this.signup = function(newUser) {
            Auth.$createUser(newUser.email, 'tempPass2014', true).then(function(newUserObj) {
                //we are hacking for better userflow, setting temp password and instantly sending a reovery email with a token and a link for the user to set a real password
                //create a record for the new user
                Users[newUserObj.uid] = newUser;
                Users.$save(newUserObj.uid).then(function(ref) {
                    //then send password reset email with a token
                    Auth.$sendPasswordResetEmail(newUser.email).then(function(){
                        $location.path('/');
                        toastr.success('Thank you! We\'ve sent an email with further instructions your way.');
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
        userObj.$update({
            lastLoginTime: now
        });
    }

    function checkFirstLoginToday(userObj) {
        var lastLogin = moment(userObj.lastLoginTime);
        $log.log(lastLogin);
    }

    function refreshUserObj() {
        getUserViaId().then(function(u){
            self.user = u;
        });
    }

    function getUserViaId(uid) {
        //create response promise
        var userObjDeferred = $q.defer();
        //uid may be passed as 'undefined', string value or a promise. we need to deal with all those cases

        //wrap uid around with a promise, even if it's a value
        var uidPromise = $q.when(uid);
        //check if we have uid
        if(!uid) {
            var uidDefer = $q.defer();
            AuthFactory.$getCurrentUser().then(function(user){
                if(user && user.uid){
                    uidDefer.resolve(user.uid); 
                } else {
                    uidDefer.resolve(false);
                }
            });
            uidPromise = uidDefer.promise;
        }
        uidPromise.then(function(useruid){
            //may be we don't have an uid or a user at all
            if(!useruid) {
                userObjDeferred.resolve(false);
                return;
            }
            //ok, we have a valide uid
            var userObj = UsersFactory.$child(useruid);
            //check if this is the first login of the day and set appropriate flags
            checkFirstLoginToday(userObj);
            //log last login time
            logLastLoginTime(userObj);
            userObjDeferred.resolve(userObj);
        });

        //return the promise
        return userObjDeferred.promise;
    };
}]);
