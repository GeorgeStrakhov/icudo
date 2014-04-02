'use strict';

/*
 * routes configuration
 */

angular.module('iuido')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
          templateUrl: 'views/landing.html',
          controller: 'LandingController'
      })
      .when('/login', {
         templateUrl: '/views/login.html',
         controller: 'UsersController'
      })
      .when('/signup', {
          templateUrl: '/views/signup.html',
          controller: 'UsersController'
      })
      .when('/tasks', {
        templateUrl: '/views/main.html',
        controller: 'TasksController',
        resolve: {
            'auth': function(SecurityService) {
                return SecurityService.check();
            }
        }
      })
      .when('/profile', {
          templateUrl: '/views/userProfile.html',
          controller: 'UsersController',
          resolve: {
              'auth': function(SecurityService) {
                  return SecurityService.check();
              }
          }
      })
      .when('/changepassword', {
          templateUrl: '/views/changePassword.html',
          controller: 'ChangePasswordController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
