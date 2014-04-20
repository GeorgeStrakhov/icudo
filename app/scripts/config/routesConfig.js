'use strict';

/*
 * routes configuration
 */

angular.module('icudo')
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
.when('/do', {
  templateUrl: '/views/todo.html',
controller: 'TasksController',
resolve: {
  'auth': function(SecurityService) {
    return SecurityService.check();
  }
}
})
.when('/do/:date/', {
  templateUrl: '/views/todo.html',
controller: 'TasksController',
resolve: {
  'auth': function(SecurityService) {
    return SecurityService.check();
  }
}
})
.when('/do/:date/done', {
  templateUrl: '/views/done.html',
controller: 'TasksController',
resolve: {
  'auth': function(SecurityService) {
    return SecurityService.check();
  }
}
})
.when('/do/:date/add', {
  templateUrl: '/views/editTask.html',
controller: 'AddTaskController',
resolve: {
  'auth': function(SecurityService) {
    return SecurityService.check();
  }
}
})
.when('/do/:date/edit/:task', {
  templateUrl: '/views/editTask.html',
controller: 'EditTaskController',
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
