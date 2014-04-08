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
      .when('/todo', {
        templateUrl: '/views/todo.html',
        controller: 'TasksController',
        resolve: {
            'auth': function(SecurityService) {
                return SecurityService.check();
            }
        }
      })
      .when('/havedone', {
        templateUrl: '/views/havedone.html',
        controller: 'TasksController',
        resolve: {
            'auth': function(SecurityService) {
                return SecurityService.check();
            }
        }
      })
      .when('/forgotten', {
        templateUrl: '/views/forgotten.html',
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
