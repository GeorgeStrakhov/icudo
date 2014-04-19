'use strict';

/*
 * stats service: logging data
 */

angular.module('icudo')
.service('StatsService', ['$log', 'StatsFactory', 'TimeService', function($log, StatsFactory, TimeService) {
  var self = this;
  var today = TimeService.getToday(); 

  //logVisit
  this.logVisit = function() {
    StatsFactory.$child('visits').$child(today).$transaction(function(current_value) {
      return current_value + 1;
    });
  };

  self.logVisit();

}]);
