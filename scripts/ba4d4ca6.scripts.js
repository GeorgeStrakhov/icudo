'use strict';
angular.module('icudo', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase',
  'toastr',
  'angular-underscore',
  'ngTouch',
  'ui.router',
  'ui.bootstrap'
]);
angular.module('icudo').run([
  '$templateCache',
  function ($templateCache) {
    'use strict';
    $templateCache.put('/views/changePassword.html', '<div ng-include src="\'/views/partials/headerBasic.html\'"></div>\n' + '\n' + '<h2>Update Password: </h2>\n' + '<form role="form" name="updatePasswordForm" ng-submit="changePassword()">\n' + '    <div class="form-group">\n' + '        <label for="exampleInputEmail1">Email address:</label>\n' + '        <p>{{auth.user.email}}</p>\n' + '    </div>\n' + '    <div class="form-group" ng-hide="oldUserPassword">\n' + '        <label for="exampleInputPassword1">Old Password:</label>\n' + '        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" ng-model="oldPassword" required>\n' + '    </div>\n' + '    <div class="form-group">\n' + '        <label for="exampleInputPassword2">New Password:</label>\n' + '        <input type="password" class="form-control" id="exampleInputPassword2" placeholder="Password" ng-model="newPassword" required>\n' + '    </div>\n' + '    <button type="submit" class="btn btn-danger">Update Password</button>\n' + '    <div class="spacer-y"></div>\n' + '    <a ng-href="#/profile" ng-hide="oldUserPassword">back to profile</a>\n' + '    <div class="spacer-y"></div>\n' + '</form>\n');
    $templateCache.put('/views/date.html', '<!-- Header -->\n' + '<div ng-include src="\'/views/partials/headerTasks.html\'"></div>\n' + '<div ui-view></div>\n');
    $templateCache.put('/views/done.html', '<div class="row">\n' + '  <div>\n' + '    <table class="table table-hover tasks-table">\n' + '      <tbody>\n' + '        <tr ng-repeat="task in tasks.done" ng-include="\'/views/partials/singleDoneTaskRowInside.html\'"></tr>\n' + '      </tbody>\n' + '    </table>\n' + '  </div>\n' + '</div>\n' + '\n' + '\n' + '<div class="row show-desktop">\n' + '  <hr />\n' + '  <form role="form" ng-submit="saveTask(\'done\')"> \n' + '    <div ng-include src="\'/views/partials/addEditTaskFormInnerThin.html\'"></div>\n' + '  </form>\n' + '</div>\n');
    $templateCache.put('/views/editTask.html', '<div>\n' + '  <form role="form" ng-submit="saveTask(\'todo\')"> \n' + '    <div ng-include src="\'/views/partials/addEditTaskFormInner.html\'"></div>\n' + '    <button type="submit" class="btn btn-success">save to todo</button>\n' + '    &nbsp; or <a href ng-click="saveTask(\'done\')">save to done</a>\n' + '  </form>\n' + '</div>\n');
    $templateCache.put('/views/landing.html', '<div ng-hide="auth.user">\n' + '  <div ng-include src="\'/views/partials/headerUnauthorized.html\'"></div>\n' + '  <div class="row centered">\n' + '    <h1 class="headline"><span class="icudo-important">I</span><span class="icudo-cool">C</span><span class="icudo-urgent">U</span>DO</h1>\n' + '    <h4 class="tagline">do what matters</h4>\n' + '  </div>\n' + '  <div class="spacer-y"></div>\n' + '  <div class="elevatorpitch">\n' + '    <p>We all want to do more than we can. Todo lists quickly get out of hand. And with every task being <span class="icudo-urgent">urgent</span>, you end up never making time to focus on what\'s <span class="icudo-important">important</span> or on what you <span class="icudo-cool">really want to do</span>.</p>\n' + '    <p><span class="icudo-important">I</span><span class="icudo-cool">C</span><span class="icudo-urgent">U</span>DO - is a different approach which focuses on what matters. The principle is simple:</p>\n' + '      <p>Every day start afresh and do at least 3 things: one that is <span class="icudo-important">important</span>, one that is <span class="icudo-cool">cool</span> and one that is <span class="icudo-urgent">urgent</span>.</p>\n' + '  </div>\n' + '  <div class="spacer-y"></div>\n' + '  <div class="row centered">\n' + '    <a class="btn btn-large btn-success" ng-href="#/signup">Sign up</a>\n' + '  </div>\n' + '  <div class="spacer-y"></div>\n' + '  <div class="row centered">\n' + '    <p>Already a user?</p>\n' + '    <a class="btn btn-default" ng-href="#/login">Login</a>\n' + '  </div>\n' + '  <div class="spacer-y"></div>\n' + '</div>\n');
    $templateCache.put('/views/login.html', '<div ng-include src="\'/views/partials/headerUnauthorized.html\'"></div>\n' + '\n' + '<div class="omb_login">\n' + '\n' + '    <div class="spacer-y"></div>\n' + '    <div class="row omb_row-sm-offset-3">\n' + '        <div class="col-xs-12 col-sm-6">    \n' + '            <form class="omb_loginForm" name="loginForm" autocomplete="off">\n' + '                <div class="input-group">\n' + '                    <span class="input-group-addon"><i class="fa fa-user"></i></span>\n' + '                    <input type="text" class="form-control" name="username" placeholder="email address" ng-model="userEmail" auto-focus>\n' + '                </div>\n' + '                <span class="help-block"></span>\n' + '\n' + '                <div class="input-group" ng-hide="recoveringPassword">\n' + '                    <span class="input-group-addon"><i class="fa fa-lock"></i></span>\n' + '                    <input  type="password" class="form-control" name="password" placeholder="Password" ng-model="userPassword">\n' + '                </div>\n' + '\n' + '                <div class="spacer-y"></div>\n' + '                <button class="btn btn-lg btn-primary btn-block" ng-click="tryLogin()" ng-hide="recoveringPassword">Login</button>\n' + '                <button class="btn btn-lg btn-primary btn-block" ng-click="recoverPassword()" ng-show="recoveringPassword">Send Password Reset Instructions</button>\n' + '            </form>\n' + '        </div>\n' + '    </div>\n' + '    <div class="spacer-y"></div>\n' + '    <div class="row omb_row-sm-offset-3">\n' + '        <div class="col-xs-12 col-sm-4">\n' + '            <p class="omb_forgotPwd">\n' + '            <a href ng-click="toggleRecoveringPassword()">{{(recoveringPassword) ? \'Remembered Password?\' : \'Forgot password?\'}}</a>\n' + '            <br />\n' + '            <a ng-href="#/signup">Don\'t have an account?</a>\n' + '            </p>\n' + '        </div>\n' + '    </div>          \n' + '</div>\n');
    $templateCache.put('/views/menu.html', '<!-- menu header -->\n' + '<div>\n' + '  <table class="icudo-navbar icudo-navbar-mobile">\n' + '    <tr>\n' + '      <td>\n' + '        <a ng-href ng-click="goBack()" class="icudo-menu-button icudo-button-logo pull-right"></a>\n' + '      </td>\n' + '    </tr>\n' + '  </table>\n' + '</div>\n' + '<!-- menu content -->\n' + '<div class="mobileMenuContainer">\n' + '  <ul class="mobileMenu nav nav-pills nav-stacked" ng-include src="\'/views/partials/menuListItems.html\'"></ul>\n' + '</div>\n');
    $templateCache.put('/views/partials/addEditTaskFormInner.html', '<div class="form-group">\n' + '  <input type="text" class="form-control" id="taskInput" placeholder="Enter task" ng-model="task.name" required auto-focus>\n' + '</div>\n' + '<div class="checkbox">\n' + '  <label>\n' + '    <input type="checkbox" ng-model="task.important"> important\n' + '  </label>\n' + '</div>\n' + '<div class="checkbox">\n' + '  <label>\n' + '    <input type="checkbox" ng-model="task.cool"> cool\n' + '  </label>\n' + '</div>\n' + '<div class="checkbox">\n' + '  <label>\n' + '    <input type="checkbox" ng-model="task.urgent"> urgent\n' + '  </label>\n' + '</div>\n');
    $templateCache.put('/views/partials/addEditTaskFormInnerThin.html', '<div class="form-group">\n' + '  <input type="text" class="form-control" id="taskInput" placeholder="Enter task" ng-model="task.name" required auto-focus>\n' + '</div>\n' + '<div>\n' + '  <label class="checkbox-inline">\n' + '    <input type="checkbox" ng-model="task.important"> important\n' + '  </label>\n' + '  <label class="checkbox-inline">\n' + '    <input type="checkbox" ng-model="task.cool"> cool\n' + '  </label>\n' + '  <label class="checkbox-inline">\n' + '    <input type="checkbox" ng-model="task.urgent"> urgent\n' + '  </label>\n' + '  <button type="submit" class="btn btn-success pull-right">add</button>\n' + '</div>\n');
    $templateCache.put('/views/partials/footer.html', '<div class="footer centered">\n' + '    <p>ICUDO |  DO WHAT MATTERS | 2014</p>\n' + '</div>\n');
    $templateCache.put('/views/partials/headerBasic.html', '<div>\n' + '  <table class="icudo-navbar icudo-navbar-mobile">\n' + '    <tr>\n' + '      <td>\n' + '        <a ng-href="#/menu/" class="icudo-menu-button icudo-button-logo pull-left hide-desktop"></a>\n' + '      </td>\n' + '    </tr>\n' + '  </table>\n' + '</div>\n');
    $templateCache.put('/views/partials/headerTasks.html', '<div>\n' + '  <table class="icudo-navbar icudo-navbar-mobile">\n' + '    <tr>\n' + '      <td>\n' + '        <a ng-href="#/menu/" class="icudo-menu-button icudo-button-logo pull-left hide-desktop"></a>\n' + '        <a ng-href="#/{{currentDate}}/todo" class="show-desktop">FOCUS</a>\n' + '      </td>\n' + '      <td class="datepicker-td">\n' + '        <div class="centered" ng-controller="DatePickerController">\n' + '          <a ng-href="#/{{today}}/todo/">TODO</a>\n' + '          |\n' + '          <a href ng-click="open($event)">{{today}}</a>\n' + '          <div class="datepicker-wrapper pull-left">\n' + '            <input type="text" class="form-control hide" datepicker-popup="yyyy-mm-dd" ng-model="dt" is-open="opened" ng-required="true" show-button-bar="false" close-text="Close" />\n' + '          </div>\n' + '          |\n' + '          <a ng-href="#/{{today}}/done/">DONE</a>\n' + '        </div>\n' + '      </td>\n' + '      <td>\n' + '        <a ng-href="#/{{today}}/add" class="icudo-menu-button icudo-button-plus pull-right hide-desktop"></a>\n' + '        <a ng-href="#/profile" class="show-desktop pull-right">PROFILE</a> \n' + '      </td>\n' + '    </tr>\n' + '  </table>\n' + '</div>\n' + '<div class="spacer-y show-dektop"></div>\n');
    $templateCache.put('/views/partials/headerUnauthorized.html', '<div class="centered">\n' + '  <a ng-href="#/" class="btn icudo-menu-button icudo-button-logo icudo-button-huge"></a>\n' + '</div>\n');
    $templateCache.put('/views/partials/loading.html', '<div class="globalLoader centered" ng-show="globalLoading"></div>\n');
    $templateCache.put('/views/partials/menu.html', '<ul>\n' + '  <div ng-include src="\'/views/partials/menuListItems.html\'"></div>\n' + '</ul>\n');
    $templateCache.put('/views/partials/menuListItems.html', '<li ng-hide="auth.user"><a ng-href="#/login">Login</a></li>\n' + '<li ng-show="auth.user"><a ng-href="#/{{currentDate}}/todo">Today</a></li>\n' + '<li ng-show="auth.user"><a ng-href="#/profile">Profile</a></li>\n' + '<li ng-show="auth.user"><a ng-href ng-click="logout()">Logout</a></li>\n');
    $templateCache.put('/views/partials/singleActiveTaskActions.html', '<td>\n' + '  <span class="taskActions">\n' + '    <a href ng-click="deleteTask(task.id)" >forget</a>&nbsp;|&nbsp;<a href ng-click="changeTaskStatus(task.id, \'done\')" >done</a>\n' + '  </span>\n' + '</td>\n');
    $templateCache.put('/views/partials/singleActiveTaskActionsYesterday.html', '<td>\n' + '  <span class="taskActions">\n' + '    <a href ng-click="markYesterdaysTaskDone(task.id)" >mark done</a>\n' + '    &nbsp;|&nbsp;\n' + '    <a href ng-click="copyTaskToToday(task.id)" >do it today</a>\n' + '  </span>\n' + '</td>\n');
    $templateCache.put('/views/partials/singleActiveTaskRowInside.html', '<td class="indicator-cell"><span class="task-indicator" ng-class="{important: task.important}" ng-click="toggleTaskAttribute(task.id, \'important\')"></span></td>\n' + '<td class="indicator-cell"><span class="task-indicator" ng-class="{cool: task.cool}" ng-click="toggleTaskAttribute(task.id, \'cool\')"></span></td>\n' + '<td class="indicator-cell"><span class="task-indicator" ng-class="{urgent: task.urgent}" ng-click="toggleTaskAttribute(task.id, \'urgent\')"></span></td>\n' + '<td ng-click="goToEdit(task.id)" ng-swipe-right="changeTaskStatus(task.id, \'done\')">\n' + '  <span class="taskName"> \n' + '    {{task.name}}\n' + '  </span>\n' + '</td>\n' + '<td class="taskActionsTd">\n' + '  <div ng-include src="\'/views/partials/singleActiveTaskActions.html\'"></div>\n' + '</td>\n');
    $templateCache.put('/views/partials/singleActiveTaskRowInsideYesterday.html', '<td class="indicator-cell"><span class="task-indicator" ng-class="{important: task.important}" ng-click="toggleTaskAttribute(task.id, \'important\')"></span></td>\n' + '<td class="indicator-cell"><span class="task-indicator" ng-class="{cool: task.cool}" ng-click="toggleTaskAttribute(task.id, \'cool\')"></span></td>\n' + '<td class="indicator-cell"><span class="task-indicator" ng-class="{urgent: task.urgent}" ng-click="toggleTaskAttribute(task.id, \'urgent\')"></span></td>\n' + '<td ng-dblclick="goToEdit(task.id)">\n' + '  <span class="taskName"> \n' + '    {{task.name}}\n' + '  </span>\n' + '</td>\n' + '<td>\n' + '  <div ng-include src="\'/views/partials/singleActiveTaskActionsYesterday.html\'"></div>\n' + '</td>\n');
    $templateCache.put('/views/partials/singleDoneTaskRowInside.html', '<td class="indicator-cell"><span class="task-indicator" ng-class="{important: task.important}" ng-click="toggleTaskAttribute(task.id, \'important\')"></span></td>\n' + '<td class="indicator-cell"><span class="task-indicator" ng-class="{cool: task.cool}" ng-click="toggleTaskAttribute(task.id, \'cool\')"></span></td>\n' + '<td class="indicator-cell"><span class="task-indicator" ng-class="{urgent: task.urgent}" ng-click="toggleTaskAttribute(task.id, \'urgent\')"></span></td>\n' + '<td class="ng-click="goToEdit(task.id)" ng-swipe-left="changeTaskStatus(task.id, \'todo\')">\n' + '  <span class="taskName"> \n' + '    {{task.name}}\n' + '  </span>\n' + '</td>\n');
    $templateCache.put('/views/signup.html', '<div ng-include src="\'/views/partials/headerUnauthorized.html\'"></div>\n' + '\n' + '<div class="omb_login">\n' + '\n' + '    <div class="spacer-y"></div>\n' + '    <div class="row omb_row-sm-offset-3">\n' + '        <div class="col-xs-12 col-sm-6">    \n' + '            <form class="omb_loginForm" name="loginForm" ng-submit="signup()">\n' + '                <div class="input-group">\n' + '                    <span class="input-group-addon"><i class="fa fa-user"></i></span>\n' + '                    <input type="text" class="form-control" name="username" placeholder="Your Name" ng-model="newUserName" required auto-focus>\n' + '                </div>\n' + '                <span class="help-block"></span>\n' + '\n' + '                <div class="input-group">\n' + '                    <span class="input-group-addon"><i class="fa fa-envelope"></i></span>\n' + '                    <input type="email" class="form-control" name="userEmail" placeholder="email address" ng-model="newUserEmail"required>\n' + '                </div>\n' + '\n' + '                <div class="spacer-y"></div>\n' + '                <button class="btn btn-lg btn-success btn-block" type="submit">Sign up</button>\n' + '            </form>\n' + '        </div>\n' + '    </div>\n' + '    <div class="spacer-y"></div>\n' + '    <div class="row omb_row-sm-offset-3">\n' + '        <div class="col-xs-12 col-sm-4">\n' + '            <p class="omb_forgotPwd">\n' + '            <a ng-href="#/login">Already a user?</a>\n' + '            </p>\n' + '        </div>\n' + '    </div>          \n' + '</div>\n');
    $templateCache.put('/views/todo.html', '<div class="row" ng-show="showYesterdaysTasks()">\n' + '  <alert close="forgetYesterday()">\n' + '  <h3>Hey! These things were not finished from yesterday.</h3>\n' + '  <hr />\n' + '  <table class="table tasks-table">\n' + '    <tbody>\n' + '    <tr class="focusTasksRow" ng-repeat="task in yesterdaysActiveTasks" ng-include="\'/views/partials/singleActiveTaskRowInsideYesterday.html\'"></tr>\n' + '    </tbody>\n' + '  </table>\n' + '  <button ng-click="forgetYesterday()" class="btn btn-default btn-sm">Let them all rest in peace</button>\n' + '  </alert>\n' + '</div>\n' + '\n' + '<div class="row">\n' + '  <table class="table table-hover tasks-table">\n' + '    <tbody>\n' + '    <tr class="focusTasksRow" ng-repeat="task in tasks.focus" ng-include="\'/views/partials/singleActiveTaskRowInside.html\'"></tr>\n' + '    <tr ng-repeat="task in tasks.todo" ng-include="\'/views/partials/singleActiveTaskRowInside.html\'"></tr>\n' + '    </tbody>\n' + '  </table>\n' + '</div>\n' + '\n' + '<div class="row centered" ng-show="tasks.noTasksForToday">\n' + '  <p>No tasks here...</p>\n' + '  <div class="spacer-y"></div>\n' + '  <p class="hide-desktop">\n' + '  <a ng-href="#/{{today}}/add" class="btn btn-success">Add one now</a>\n' + '  </p>\n' + '</div>\n' + '\n' + '<div class="row show-desktop">\n' + '  <hr />\n' + '  <form role="form" ng-submit="saveTask(\'todo\')"> \n' + '    <div ng-include src="\'/views/partials/addEditTaskFormInnerThin.html\'"></div>\n' + '  </form>\n' + '</div>\n');
    $templateCache.put('/views/userProfile.html', '<div ng-include src="\'/views/partials/headerBasic.html\'"></div>\n' + '\n' + '<h2>Your Profile settings: </h2>\n' + '\n' + '<form role="form" name="updateUserSettingsForm" ng-submit="updateUserSettings()">\n' + '    <div class="form-group">\n' + '        <label for="exampleInputEmail1">Email address:</label>\n' + '        <p>{{user.userData.email}}</p>\n' + '    </div>\n' + '    <div class="form-group">\n' + '        <label for="username">Name:</label>\n' + '        <input type="text" class="form-control" id="username" ng-model="user.userData.name" required>\n' + '    </div>\n' + '    <button type="submit" class="btn btn-success">Update Settings</button>\n' + '    <div class="spacer-y"></div>\n' + '</form>\n' + '\n' + '<a ng-href="#/changepassword">Update Password</a>\n' + '\n' + '<div class="spacer-y"></div>\n' + '\n' + '<a ng-href ng-click="logout()" class="btn btn-danger">Logout</a>\n' + '\n' + '<div class="spacer-y"></div>\n' + '\n' + '<a ng-href="#/">Back to Tasks</a>\n');
  }
]);
'use strict';
/*
 * routes and states configuration with ui-router
 */
angular.module('icudo').config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
      url: '/',
      templateUrl: '/views/landing.html',
      controller: 'LandingController'
    }).state('menu', {
      url: '/menu/',
      templateUrl: '/views/menu.html'
    }).state('login', {
      url: '/login/',
      templateUrl: '/views/login.html',
      controller: 'LoginSignupController'
    }).state('signup', {
      url: '/signup/',
      templateUrl: '/views/signup.html',
      controller: 'LoginSignupController'
    }).state('resetpassword', {
      url: '/resetpassword/:email/token/:token/',
      templateUrl: '/views/changePassword.html',
      controller: 'ResetPasswordController'
    }).state('userprofile', {
      url: '/profile/',
      templateUrl: '/views/userProfile.html',
      controller: 'ProfileController',
      resolve: {
        'auth': function (SecurityService) {
          return SecurityService.check();
        }
      }
    }).state('changepassword', {
      url: '/changepassword/',
      templateUrl: '/views/changePassword.html',
      controller: 'ChangePasswordController',
      resolve: {
        'auth': function (SecurityService) {
          return SecurityService.check();
        }
      }
    }).state('date', {
      url: '/{date:[0-9]{4}-[0-9]{2}-[0-9]{2}}',
      templateUrl: '/views/date.html',
      controller: function ($state, $stateParams, $rootScope, $scope) {
        //assigning rootScope.today and making sure people are not stuck at /yyyy-mm-dd and are redirected to /yyyy-mm-dd/todo
        $rootScope.today = $stateParams.date;
        $scope.$emit('changeDate', $stateParams.date);
        if ($state.current.name == 'date') {
          $state.go('date.todo', $stateParams);
        }
      },
      resolve: {
        'auth': function (SecurityService) {
          return SecurityService.check();
        }
      }
    }).state('date.todo', {
      url: '/todo/',
      templateUrl: '/views/todo.html',
      controller: 'TasksController'
    }).state('date.done', {
      url: '/done/',
      templateUrl: '/views/done.html',
      controller: 'TasksController'
    }).state('date.add', {
      url: '/add/',
      templateUrl: '/views/editTask.html',
      controller: 'AddTaskController'
    }).state('date.edittask', {
      url: '/edit/:task/',
      templateUrl: '/views/editTask.html',
      controller: 'EditTaskController'
    });
    //no need to specify resolve since it is inherited from the parent 'date' view
    $urlRouterProvider.otherwise('/');
    /* special rules to be trailslash agnostic  */
    $urlRouterProvider.rule(function ($injector, $location) {
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
      angular.forEach(search, function (v, k) {
        params.push(k + '=' + v);
      });
      return path + '/?' + params.join('&');
    });
  }
]);
'use strict';
/* 
 * config static values
 */
//simple and ugly way to choose between dev and production firebase refs
var refName = window.location.host == 'icudo.com' ? 'icudo' : 'iuido';
angular.module('icudo').constant('dataConfig', { firebaseBaseUrl: 'https://' + refName + '.firebaseio.com' });
'use strict';
/* 
 * bootstrapping the application. executed when the app is loaded.
 */
angular.module('icudo').run([
  '$rootScope',
  '$log',
  function ($rootScope, $log) {
    $log.log('Let\'s get it started!');
    //set loading state onto the rootScope it's the job of services and controllers to unset it when they are done bootstrapping
    $rootScope.globalLoading = true;
    //logging state changes
    $rootScope.$on('$stateChangeSuccess', function () {
      $log.info('state changed to: ' + arguments[1].name);
    });
  }
]);
'use strict';
angular.module('icudo').factory('AuthFactory', [
  '$firebase',
  '$firebaseSimpleLogin',
  '$log',
  'dataConfig',
  function ($firebase, $firebaseSimpleLogin, $log, dataConfig) {
    var mainRef = new Firebase(dataConfig.firebaseBaseUrl);
    return $firebaseSimpleLogin(mainRef);
  }
]);
'use strict';
angular.module('icudo').factory('ProfileCreatorFactory', [
  '$firebase',
  '$q',
  '$log',
  'dataConfig',
  function ($firebase, $q, $log, dataConfig) {
    var ProfileCreatorFactory = {};
    ProfileCreatorFactory.createProfile = function (uid, userObj) {
      $log.log(uid, userObj);
      var deferred = $q.defer();
      var u = $firebase(new Firebase(dataConfig.firebaseBaseUrl + '/users/' + uid + '/userData'));
      u.$set(userObj).then(function () {
        deferred.resolve(u);
      }, function (err) {
        deferred.resolve(false);
        $log.log(err);
      });
      return deferred.promise;
    };
    return ProfileCreatorFactory;
  }
]);
'use strict';
/*
 * factory for stats
 */
angular.module('icudo').factory('StatsFactory', [
  '$firebase',
  'dataConfig',
  '$log',
  function ($firebase, dataConfig, $log) {
    var ref = new Firebase(dataConfig.firebaseBaseUrl + '/appData/stats');
    return $firebase(ref);
  }
]);
'use strict';
/*
 * security service: checking auth rights for routes and listening to rejections
 */
angular.module('icudo').factory('SecurityService', [
  '$q',
  '$log',
  'AuthFactory',
  function ($q, $log, Auth) {
    var Security = {
        check: function () {
          var response = $q.defer();
          Auth.$getCurrentUser().then(function () {
            if (Auth.user) {
              response.resolve(true);
            } else {
              response.reject('You need to log in to see this page');
            }
          });
          return response.promise;
        }
      };
    return Security;
  }
]).run([
  '$rootScope',
  '$location',
  '$state',
  '$log',
  function ($rootScope, $location, $state, $log) {
    //on location that requires auth - save goToNext to rootscope and redirect to login
    $rootScope.$on('$stateChangeError', function (rejection, toState, stateParams, redirectingToState, smth, rejectionReason) {
      if (rejectionReason) {
        $rootScope.goToNext = {
          to: toState.name,
          toParams: stateParams
        };
        $state.go('login');
        $rootScope.$broadcast('notification', {
          message: rejectionReason,
          type: 'error'
        });
        $log.error(rejectionReason);
      }
    });
  }
]);
'use strict';
/*
 * user service: everything related to users
 */
angular.module('icudo').service('UserService', [
  '$q',
  '$log',
  '$firebase',
  'AuthFactory',
  'ProfileCreatorFactory',
  'StatsService',
  'TimeService',
  'dataConfig',
  '$rootScope',
  '$location',
  '$state',
  'toastr',
  '$timeout',
  function ($q, $log, $firebase, AuthFactory, ProfileCreatorFactory, StatsService, TimeService, dataConfig, $rootScope, $location, $state, toastr, $timeout) {
    var Auth = AuthFactory;
    var self = this;
    //subscribe to events
    $rootScope.$on('$firebaseSimpleLogin:login', function (e, user) {
      $log.log('login!');
      $rootScope.globalLoading = true;
      self.user = $firebase(new Firebase(dataConfig.firebaseBaseUrl + '/users/' + user.uid));
      self.user.$on('loaded', function () {
        //loading flag to loaded
        $rootScope.globalLoading = false;
        //check if it's the first login for today; if yes - show unfinished from yesterday prompt
        if (checkFirstLoginToday(self.user)) {
          self.user.firstVisitToday = true;
        }
        //log last login
        logLastLoginTime(self.user);
      });
    });
    this.updateUserData = function (id, userObj) {
      self.user.$update(userObj).then(function () {
        //make sure the value in this singleton stays fresh
        toastr.success('Settings updated!');
      }, function (error) {
        toaster.error(error);
      });
    };
    this.tryLogin = function (email, password) {
      $rootScope.globalLoading = true;
      Auth.$login('password', {
        email: email,
        password: password
      }).then(function (user) {
        //if there is a route to which we should redirect
        if ($rootScope.goToNext) {
          var goToNext = $rootScope.goToNext;
          $rootScope.goToNext = false;
          $state.go(goToNext.to, goToNext.toParams);
        } else {
          //default route to go to 
          $location.path('/');
        }
        toastr.success('Welcome back!');
      }, function (error) {
        $log.log(error);
        $rootScope.globalLoading = false;
        toastr.error('Something doesn\'t look right, please check and try again');
      });
    };
    this.logout = function () {
      $log.log('logout!');
      Auth.$logout();
      self.user = undefined;
      $timeout(function () {
        $state.go('home');
        $rootScope.globalLoading = false;
        toastr.success('Farewell!');
      }, 100);
    };
    this.recoverPassword = function (email) {
      Auth.$sendPasswordResetEmail(email);
      $location.path('/');
      toastr.success('Please check your email, we sent instructions your way!');
    };
    this.signup = function (newUser) {
      $log.info('signup');
      $rootScope.globalLoading = true;
      //this is an ugly callback hell nightmare. ToDo: refactor
      Auth.$createUser(newUser.email, 'tempPass2014', true).then(function (newUserObj) {
        //login he newly created user first
        Auth.$login('password', {
          email: newUser.email,
          password: 'tempPass2014'
        }).then(function (user) {
          //we are hacking for better userflow, setting temp password and instantly sending a reovery email with a token and a link for the user to set a real password
          //create a record for the new user
          ProfileCreatorFactory.createProfile(newUserObj.uid, newUser).then(function (userObj) {
            //then send password reset email with a token
            Auth.$sendPasswordResetEmail(newUser.email).then(function () {
              Auth.$logout();
              $location.path('/');
              toastr.success('Thank you! We\'ve sent an email with further instructions your way.');
              $rootScope.globalLoading = false;
            }, function (err) {
              $log.error(err);
              $rootScope.globalLoading = false;
              toastr.error('Sorry, there was an error.');
            });
          });
        });
      }, function (reason) {
        $log.error(reason);
        toastr.error(reason.code);
        $rootScope.globalLoading = false;
      });
    };
    /* helper functions */
    function logLastLoginTime(userObj) {
      var now = new Date().getTime();
      userObj.$child('metaData').$update({ lastLoginTime: now });
    }
    function checkFirstLoginToday(userObj) {
      var todayDate = TimeService.getToday();
      var lastLoginDate = userObj.metaData ? TimeService.formatTimestamp(userObj.metaData.lastLoginTime) : todayDate;
      return !(todayDate == lastLoginDate);
    }
  }
]);
'use strict';
/*
 * task service: everything related to tasks
 * singleton!
 */
angular.module('icudo').service('TaskService', [
  '$q',
  '$timeout',
  '$firebase',
  '$state',
  '$stateParams',
  'TimeService',
  '$log',
  '$filter',
  'dataConfig',
  '$rootScope',
  '$location',
  'toastr',
  'UserService',
  function ($q, $timeout, $firebase, $state, $stateParams, TimeService, $log, $filter, dataConfig, $rootScope, $location, toastr, UserService) {
    /* initialization */
    var self = this;
    this.user = UserService.user;
    this.yesterdaysTasks = {};
    this.yesterdaysActiveTasks = {};
    this.tasks = getDayTasks();
    //holder for debouncing location change
    var justChangedLocation = false;
    //holder for filtered and structured data to be given to the controller
    this.allTasks = {};
    this.defaultTaskObj = {
      name: 'be happy',
      important: false,
      cool: false,
      urgent: false,
      status: 'todo'
    };
    //listen to collection load and update and refresh data (different subsets of tasks) accordingly
    attachListeners(self.tasks);
    //listen to the diffirent controllers emitting changeDate event!
    $rootScope.$on('changeDate', function (e, newDate) {
      self.changeDate(newDate);
    });
    //get task from id NB! assumes from the current date only!
    this.getTaskById = function (taskId) {
      return self.tasks.$child(taskId);
    };
    //add new task
    this.addNewTask = function (taskObj, params) {
      params = params ? params : {};
      _.defaults(taskObj, self.defaultTaskObj);
      _.defaults(params, {
        redirectToAllTasks: false,
        notifySuccess: true
      });
      taskObj.createdAt = new Date().getTime();
      taskObj.updatedAt = new Date().getTime();
      self.tasks.$add(taskObj).then(function (ref) {
        $log.log('task added: ' + ref.name());
        if (params.redirectToAllTasks) {
          redirectToAllTasks();
        } else {
          if (params.notifySuccess) {
            toastr.success('Task added!');
          }
        }
      }, function (err) {
        toastr.error(err.code);
        $log.log(err);
      });
    };
    //change task status
    this.changeTaskStatus = function (id, newStatus) {
      updateTask(id, { 'status': newStatus });
      toastr.success('Moved to ' + newStatus + '!');
    };
    //delete task
    this.deleteTask = function (id) {
      self.tasks.$remove(id);
      $log.log(id);
    };
    //update task
    this.updateTask = function (id, updatedTaskObj, shouldRedirectToAllTasks) {
      updateTask(id, updatedTaskObj);
      if (shouldRedirectToAllTasks) {
        redirectToAllTasks();
      }
    };
    //toggle task attribute
    this.toggleTaskAttribute = function (id, attr) {
      var task = self.tasks.$child(id);
      task[attr] = !task[attr];
      task.$save().then(function (s) {
        $log.log('task updated: ' + id);
      }, function (e) {
        $log.error(e);
      });
    };
    //fetch new tasks for a given date; if no date is given - then for today
    this.changeDate = function (date) {
      var deferred = $q.defer();
      self.tasks = getDayTasks(date);
      $rootScope.globalLoading = true;
      self.tasks.$on('loaded', function (s) {
        attachListeners(self.tasks);
        $rootScope.globalLoading = false;
        deferred.resolve(true);
      }, function (e) {
        $log.error(e);
        deferred.reject(e);
      });
      return deferred.promise;
    };
    //get yesterdays active tasks in an object
    this.getYesterdaysActiveTasks = function () {
      var deferred = $q.defer();
      var allYestTasks = getDayTasks(TimeService.getYesterday());
      self.yesterdaysTasks = allYestTasks;
      var yestActiveTasks = {};
      allYestTasks.$on('loaded', function () {
        if (allYestTasks.$getIndex().length > 0) {
          _.each(allYestTasks, function (value, key) {
            if (value.status == 'todo') {
              value.id = key;
              yestActiveTasks[key] = value;
            }
          });
        }
        self.yesterdaysActiveTasks = yestActiveTasks;
        deferred.resolve(yestActiveTasks);
      }, function (e) {
        $log.error(e);
        deferred.reject(e);
      });
      return deferred.promise;
    };
    //remove a task from yesterday's active tasks list by id
    this.removeYesterdaysTask = function (id) {
      if (id && self.yesterdaysActiveTasks[id]) {
        delete self.yesterdaysActiveTasks[id];
      }
      if (_.size(self.yesterdaysActiveTasks) < 1) {
        self.user.firstVisitToday = false;
      }
    };
    //mark yesterdays task done (by id)
    this.markYesterdaysTaskDone = function (yTaskId) {
      //update the task
      self.yesterdaysTasks.$child(yTaskId).$update({
        status: 'done',
        updatedAt: new Date().getTime()
      }).then(function (s) {
        $log.log('task updated: ' + yTaskId);
        //then remove it from yesterdaysActiveTasks
        self.removeYesterdaysTask(yTaskId);
      }, function (e) {
        $log.error(e);
      });
    };
    /* helper functions */
    //attach listeners
    function attachListeners(collection) {
      collection.$on('loaded', function (e) {
        $rootScope.globalLoading = false;
        $rootScope.today = self.tasks.$id;
        refreshData();
        collection.$on('change', function (e) {
          refreshData();
        });
      });
    }
    //update a task
    function updateTask(id, updateDataObj) {
      updateDataObj.updatedAt = new Date().getTime();
      self.tasks.$child(id).$update(updateDataObj).then(function (s) {
        $log.log('task updated: ' + id);
      }, function (e) {
        $log.error(e);
      });
    }
    //get tasks (resource) for a given day & user (optional)
    function getDayTasks(date, userId) {
      var ref = getRef(date, userId);
      return $firebase(ref);
    }
    ;
    //getRef given the optional date and userId
    function getRef(date, userId) {
      if (!userId) {
        if (!UserService.user)
          return new Firebase(dataConfig.firebaseBaseUrl);
        userId = UserService.user.$id;
      }
      if (!date || !TimeService.validateDateString(date)) {
        date = getDate();
      }
      return new Firebase(dataConfig.firebaseBaseUrl + '/users/' + userId + '/tasks/' + date + '/');
    }
    //get date from routeparams or today
    function getDate() {
      if ($stateParams.date) {
        return $stateParams.date;
      }
      return TimeService.getToday();
    }
    //redirect to all tasks
    function redirectToAllTasks() {
      $state.go('date.todo', { date: $rootScope.today });
    }
    ;
    // reapply filters and reassign data
    var filteredTasks;
    //debouncing filtering to avoid expensive calculations. this is a hack. need to understand why without it filtering is sometimes redone multiple times per update. TODO: unhack;
    var justFiltered = false;
    function refreshData() {
      if (!justFiltered) {
        filteredTasks = $filter('tasksFilter')(self.tasks);
        self.allTasks.focus = filteredTasks.focus;
        self.allTasks.todo = filteredTasks.todo;
        self.allTasks.done = filteredTasks.done;
        self.allTasks.noTasksForToday = _.size(filteredTasks.focus) == 0;
        $rootScope.$broadcast('tasksUpdated');
      }
      justFiltered = true;
      $timeout(function () {
        justFiltered = false;
      }, 200);
    }
  }
]);
'use strict';
/*
 * stats service: logging data
 */
angular.module('icudo').service('StatsService', [
  '$log',
  'StatsFactory',
  'TimeService',
  function ($log, StatsFactory, TimeService) {
    var self = this;
    var today = TimeService.getToday();
    //logVisit
    this.logVisit = function () {
      StatsFactory.$child('visits').$child(today).$transaction(function (current_value) {
        return current_value + 1;
      });
    };
    self.logVisit();
  }
]);
'use strict';
/*
 * time service: doing all the time stuff. relies on moment.js being globally available (TODO: isolate momentjs dependancy to this service)
 */
angular.module('icudo').service('TimeService', [
  '$log',
  function ($log) {
    var self = this;
    this.now = moment();
    //NB! but don't do anythign with this since momentjs wil mutate the original object with every operation
    this.getToday = function () {
      return getFormattedDate(self.now);
    };
    this.getYesterday = function () {
      return getFormattedDate(moment().subtract('days', 1));
    };
    this.validateDateString = function (dateString) {
      if (!dateString)
        return false;
      return moment(dateString, 'YYYY-MM-DD', true).isValid();
    };
    this.formatDate = function (dateObject) {
      return getFormattedDate(moment(dateObject));
    };
    this.formatMoment = function (momentObj) {
      return getFomrattedDate(momentObj);
    };
    this.formatTimestamp = function (timestamp) {
      return getFormattedDate(moment(timestamp));
    };
    /* internal functions */
    function getFormattedDate(theMoment, format) {
      format = format ? format : 'YYYY-MM-DD';
      return theMoment.format(format);
    }
  }
]);
'use strict';
angular.module('icudo').controller('AppController', [
  '$scope',
  'TimeService',
  'AuthFactory',
  'UserService',
  '$window',
  '$log',
  function ($scope, TimeService, Auth, UserService, $window, $log) {
    //get current user
    $scope.user = UserService.user;
    $scope.auth = Auth;
    //set current date
    $scope.currentDate = TimeService.getToday();
    //go back
    $scope.goBack = function () {
      $window.history.back();
    };
    //logout
    $scope.logout = function () {
      UserService.logout();
    };
  }
]);
'use strict';
angular.module('icudo').controller('LoginSignupController', [
  '$scope',
  '$rootScope',
  'UserService',
  '$log',
  function ($scope, $rootScope, UserService, $log) {
    //initialization
    $scope.recoveringPassword = false;
    $rootScope.globalLoading = false;
    //login
    $scope.tryLogin = function () {
      UserService.tryLogin($scope.userEmail, $scope.userPassword);
    };
    //toggle recovering password
    $scope.toggleRecoveringPassword = function () {
      $scope.recoveringPassword = !$scope.recoveringPassword;
    };
    //recover password
    $scope.recoverPassword = function () {
      UserService.recoverPassword($scope.userEmail);
      $scope.recoveringPassword = false;
    };
    //signup
    $scope.signup = function () {
      var newUser = {
          'email': $scope.newUserEmail,
          'name': $scope.newUserName
        };
      UserService.signup(newUser);
    };
  }
]);
'use strict';
/* landing */
angular.module('icudo').controller('LandingController', [
  '$scope',
  '$rootScope',
  '$log',
  '$location',
  'AuthFactory',
  'TimeService',
  function ($scope, $rootScope, $log, $location, Auth, TimeService) {
    //if user authed - redirect to /ideas
    $scope.auth = Auth;
    $scope.auth.$getCurrentUser().then(function () {
      if (Auth.user) {
        var today = TimeService.getToday();
        $location.path('/' + today + '/todo/');
      } else {
        $rootScope.globalLoading = false;
      }
    });
  }
]);
'use strict';
angular.module('icudo').controller('DatePickerController', [
  '$scope',
  '$log',
  '$state',
  'TimeService',
  function ($scope, $log, $state, TimeService) {
    var today = $scope.today ? $scope.today : TimeService.getToday();
    $scope.dt = new Date(today);
    $scope.$watch('dt', function (e) {
      var date = TimeService.formatDate($scope.dt);
      if (date == $scope.today)
        return;
      //fix to prevent unnecessary jumping around
      $state.go('date.todo', { date: date });
      $scope.$emit('changeDate', date);
    });
    $scope.open = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };
  }
]);
'use strict';
/* profile page and updating user settings */
angular.module('icudo').controller('ProfileController', [
  '$scope',
  'UserService',
  '$log',
  function ($scope, UserService, $log) {
    //get current user
    $scope.user = UserService.user;
    //update user settings
    $scope.updateUserSettings = function () {
      UserService.updateUserData($scope.user.uid, $scope.user);
    };
  }
]);
'use strict';
angular.module('icudo').controller('TasksController', [
  '$scope',
  'TaskService',
  'TimeService',
  'UserService',
  '$location',
  '$log',
  function ($scope, TaskService, TimeService, UserService, $location, $log) {
    //initial data & binding on update; update event event is emitted from the taskService
    $scope.task = {};
    $scope.tasks = TaskService.allTasks;
    //logging info
    $log.info('$scope.today: ' + $scope.today);
    //load yesterday's tasks that are still in todo
    TaskService.getYesterdaysActiveTasks().then(function (d) {
      $scope.yesterdaysActiveTasks = d;
    });
    //get current user
    $scope.user = UserService.user;
    //add task
    $scope.saveTask = function (status) {
      $scope.task.status = status == 'done' ? 'done' : 'todo';
      TaskService.addNewTask($scope.task);
      //clean input field and checkboxes
      $scope.task = {};
      $('#taskInput').focus();
    };
    //go to editing task
    $scope.goToEdit = function (id) {
      $location.path('/' + $scope.today + '/edit/' + id + '/');
    };
    //toggle attribute important / cool / urgent
    $scope.toggleTaskAttribute = function (id, attr) {
      TaskService.toggleTaskAttribute(id, attr);
    };
    //changestatus
    $scope.changeTaskStatus = function (id, status) {
      TaskService.changeTaskStatus(id, status);
    };
    //delete task
    $scope.deleteTask = function (id) {
      TaskService.deleteTask(id);
    };
    //whether to show or not to show the alert about unfinished tasks from yesterday
    $scope.showYesterdaysTasks = function () {
      //show alert if a) there are some unfinished tasks from yesterday AND b) this is the first visit of today and c) we are on today's page, not on some other date's page
      if (_.size($scope.yesterdaysActiveTasks) > 0 && $scope.user.firstVisitToday && $scope.today == TimeService.getToday()) {
        return true;
      }
    };
    //copy task from yesterday to today (and remove it from the list of Yesterday's unfinished tasks);
    $scope.copyTaskToToday = function (yTaskId) {
      var tObj = $scope.yesterdaysActiveTasks[yTaskId];
      TaskService.addNewTask(tObj, { notifySuccess: false });
      TaskService.removeYesterdaysTask(yTaskId);
    };
    //mark yesterdays task done
    $scope.markYesterdaysTaskDone = function (yTaskId) {
      TaskService.markYesterdaysTaskDone(yTaskId);
    };
    //forget yesterday i.e. stop the "unfinished from yesterday" dialouge from showing till tomorrow
    $scope.forgetYesterday = function () {
      UserService.user.firstVisitToday = false;
    };
  }
]);
'use strict';
/* controller to add tasks */
angular.module('icudo').controller('AddTaskController', [
  '$scope',
  'TaskService',
  '$log',
  function ($scope, TaskService, $log) {
    //initiate
    $scope.task = {};
    //add task
    $scope.saveTask = function (status) {
      $scope.task.status = status == 'done' ? 'done' : 'todo';
      TaskService.addNewTask($scope.task, { redirectToAllTasks: true });  //true for then redirecting to the date
    };
  }
]);
'use strict';
/* controller to edit a task */
angular.module('icudo').controller('EditTaskController', [
  '$scope',
  'TaskService',
  '$stateParams',
  '$log',
  function ($scope, TaskService, $stateParams, $log) {
    //load the task to be edited via uid from the routeparams
    var taskId = $stateParams.task;
    $scope.task = TaskService.getTaskById(taskId);
    //save edit task
    $scope.saveTask = function (status) {
      $scope.task.status = status == 'done' ? 'done' : 'todo';
      TaskService.updateTask($scope.task.$id, $scope.task, true);  //true for redirecting to today
    };
  }
]);
'use strict';
angular.module('icudo').controller('ChangePasswordController', [
  '$scope',
  'AuthFactory',
  'UserService',
  '$log',
  'toastr',
  function ($scope, Auth, UserService, $log, toastr) {
    //initialization
    $scope.auth = Auth;
    //change password
    $scope.changePassword = function () {
      if (!$scope.auth.user) {
        return false;
      }
      $scope.auth.$changePassword($scope.auth.user.email, $scope.oldPassword, $scope.newPassword).then(function (i) {
        toastr.success('New password set!');
        UserService.tryLogin($scope.auth.user.email, $scope.newPassword);
      }, function (error) {
        toastr.error('Oops, something doesn\'t look right. Check your old password and try again.');
      });
    };
  }
]);
'use strict';
/* reset password - auth by email and toke in the secret url */
angular.module('icudo').controller('ResetPasswordController', [
  '$scope',
  '$rootScope',
  'AuthFactory',
  'UserService',
  '$log',
  '$location',
  '$stateParams',
  'toastr',
  function ($scope, $rootScope, Auth, UserService, $log, $location, $stateParams, toastr) {
    //initialization
    $scope.auth = Auth;
    $log.info($stateParams);
    if ($stateParams.email && $stateParams.token) {
      $scope.oldUserPassword = $scope.oldPassword = $stateParams.token;
      $scope.auth.$login('password', {
        email: $stateParams.email,
        password: $stateParams.token
      }).then(function (user) {
        $rootScope.globalLoading = false;
        $scope.user = user;
        toastr.info('Please set your new password');
      }, function (rejectReason) {
        $log.error(rejectReason);
        $location.path('/');
        $location.url($location.path());
        toastr.error('Something doesn\'t look right, please try again');
      });
    } else {
      $location.path('/');
    }
    //change password
    $scope.changePassword = function () {
      if (!$scope.auth.user) {
        return false;
      }
      $scope.auth.$changePassword($scope.auth.user.email, $scope.oldPassword, $scope.newPassword).then(function (i) {
        toastr.success('New password set!');
        $scope.oldUserPassword = false;
        UserService.tryLogin($scope.auth.user.email, $scope.newPassword);
      }, function (error) {
        toastr.error('Oops, something doesn\'t look right. Check your old password and try again.');
      });
    };
  }
]);
'use strict';
/* 
 * Matterness filter: filters a collection of tasks by icudo metterness and returns an object, containing 4 arrays:
 * 1) array of focus tasks
 * 2) array of todo tasks
 * 3) array of done tasks

 * Focus logic:
 * 1) general matterness = isImportant + isUrgent + isCool
 * 2) every day you have to do at least one cool, one important and one urgent (if they are present)
 */
angular.module('icudo').filter('tasksFilter', [
  '$log',
  function ($log) {
    var count = 0;
    var tasks = [];
    var filteredTasks = {};
    var taskParams = [
        'important',
        'cool',
        'urgent'
      ];
    var taskStatuses = [
        'todo',
        'done'
      ];
    var filterFunction = function (input) {
      //is the collection empty? return
      if (input.$getIndex().length < 1)
        return input;
      //ok, let's go on with filtering
      tasks = [];
      filteredTasks = {};
      _.each(taskStatuses, function (s) {
        filteredTasks[s] = [];
      });
      //focus will be a separate array
      filteredTasks.focus = [];
      //first assign normal matterness to each task
      _.each(input, function (task, key) {
        //we are iterating over an angularFire collection returned as an object, not an array. so need to make sure that we are not taking in the $ and $$ methods
        if (key.charAt(0) == '$') {
          return;
        }
        //inject the key into the object itself, so that we can use it later in the view
        task.id = key;
        //add matterness
        task.matterness = 0;
        _.each(taskParams, function (what) {
          if (task[what]) {
            task.matterness++;
          }
        });
        //now let's push the task to the right array depending on its status 
        if (task.status)
          filteredTasks[task.status].push(task);
      });
      /* todo tasks extra logic */
      //sort todo tasks matterness
      filteredTasks.todo = _.sortBy(filteredTasks.todo, function (task) {
        return task.matterness;
      }).reverse();
      //pick the top three for focus based on a logic that there has to be at least 1 of each (important, cool, urgent) 
      _.each(taskParams, function (what) {
        var singleParamTasks = _.filter(filteredTasks.todo, function (task) {
            return task[what] == true;
          });
        var found = false;
        //if there is at least one of [what] (i,c,u) in the done - don't force it to the focus
        _.each(filteredTasks.done, function (doneTask) {
          if (doneTask[what] == true) {
            found = true;
          }
        });
        //if the task of this [what] was not found in the done - find the first one and force it into the focus
        _.each(singleParamTasks, function (t) {
          if (!found) {
            found = true;
            if (_.indexOf(filteredTasks.focus, t) < 0) {
              filteredTasks.focus.push(t);
            }
          }
        });
      });
      //make sure that there are at least 3 tasks to focus on, even if rules do not match
      //TODO: this is ugly. refactor
      for (var z = 0; z < 3; z++) {
        if (filteredTasks.focus.length < 3 && filteredTasks.todo.length > 0) {
          if (_.indexOf(filteredTasks.focus, filteredTasks.todo[z]) < 0) {
            if (filteredTasks.todo[z]) {
              filteredTasks.focus.push(filteredTasks.todo[z]);
            }
          }
        }
      }
      //now get rid of duplication: remove the tasks that are in the focus from the list of todo tasks
      filteredTasks.todo = _.difference(filteredTasks.todo, filteredTasks.focus);
      //finally sort focus by matterness
      filteredTasks.focus = _.sortBy(filteredTasks.focus, function (task) {
        return task.matterness;
      }).reverse();
      /* done tasks extra logic */
      //sort by last updated (newer first)
      filteredTasks.done = _.sortBy(filteredTasks.done, function (task) {
        return task.updatedAt;
      }).reverse();
      count++;
      $log.log('matterness filter used ' + count + ' times by now');
      return filteredTasks;
    };
    return filterFunction;
  }
]);
'use strict';
/* autofocus an input field on view entry. field has to be marked by 'auto-focus' attribute */
angular.module('icudo').directive('autoFocus', [
  '$timeout',
  function ($timeout) {
    return {
      restrict: 'AC',
      link: function (_scope, _element) {
        $timeout(function () {
          _element[0].focus();
        }, 10);
      }
    };
  }
]);