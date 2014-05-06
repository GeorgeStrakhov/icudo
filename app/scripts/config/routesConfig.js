'use strict';

/*
 * routes and states configuration with ui-router
 */

angular.module('icudo')
.config(function($stateProvider, $urlRouterProvider){    
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/views/landing.html',
    controller: 'LandingController'
  })
  .state('menu', {
    url: '/menu/',
    templateUrl: '/views/menu.html',
  })
  .state('login', {
    url: '/login/',
    templateUrl: '/views/login.html',
    controller: 'LoginSignupController'
  })
  .state('signup', {
    url: '/signup/',
    templateUrl: '/views/signup.html',
    controller: 'LoginSignupController'
  })
  .state('resetpassword', {
    url: '/resetpassword/:email/token/:token/',
    templateUrl: '/views/changePassword.html',
    controller: 'ResetPasswordController'
  })
  .state('userprofile', {
    url: '/profile/',
    templateUrl: '/views/userProfile.html',
    controller: 'ProfileController',
    resolve: {
      'auth': function(SecurityService) {
        return SecurityService.check();
      }
    }
  })
  .state('changepassword', {
    url: '/changepassword/',
    templateUrl: '/views/changePassword.html',
    controller: 'ChangePasswordController',
    resolve: {
      'auth': function(SecurityService) {
        return SecurityService.check();
      }
    }
  })
  .state('date', {
    url: '/{date:[0-9]{4}-[0-9]{2}-[0-9]{2}}', //matching regex for date pattern yyyy-mm-dd 
    templateUrl: '/views/date.html',
    controller: function($state, $stateParams, $rootScope) { //assigning rootScope.today and making sure people are not stuck at /yyyy-mm-dd and are redirected to /yyyy-mm-dd/todo
      $rootScope.today = $stateParams.date;
      if($state.current.name == 'date') {
        $state.go('date.todo', $stateParams);
      }
    },
    resolve: {
      'auth': function(SecurityService) {
        return SecurityService.check();
      }
    }
  })
  .state('date.todo', {
    url: '/todo/',
    templateUrl: '/views/todo.html',
    controller: 'TasksController'
  }) //no need to specify resolve since it is inherited from the parent 'date' view
  .state('date.done', {
    url: '/done/',
    templateUrl: '/views/done.html',
    controller: 'TasksController'
  }) //no need to specify resolve since it is inherited from the parent 'date' view
  .state('date.add', {
    url: '/add/',
    templateUrl: '/views/editTask.html',
    controller: 'AddTaskController'
  }) //no need to specify resolve since it is inherited from the parent 'date' view
  .state('date.edittask', {
    url: '/edit/:task/',
    templateUrl: '/views/editTask.html',
    controller: 'EditTaskController'
  }) //no need to specify resolve since it is inherited from the parent 'date' view

  $urlRouterProvider.otherwise('/');

  /* special rules to be trailslash agnostic  */
  $urlRouterProvider.rule(function($injector, $location) {
    var path = $location.path();
    // Note: misnomer. This returns a query object, not a search string
    var search = $location.search();
    var params;

    // check to see if the path already ends in '/'
    if (path[path.length - 1] === '/') {
      return;
    }

    // If there was no search string / query params, return with a `/`
    if (Object.keys(search).length === 0) {
      return path + '/';
    }

    // Otherwise build the search string and return a `/?` prefix
    params = [];
    angular.forEach(search, function(v, k){
      params.push(k + '=' + v);
    });

    return path + '/?' + params.join('&');
  });
});
