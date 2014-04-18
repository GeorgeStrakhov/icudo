'use strict';

/*
 * stats service: logging data
 */

angular.module('icudo')
  .service('StatsService', ['$log', 'StatsFactory', function($log, StatsFactory) {
    var self = this;
    
    //logVisit
    this.logVisit = function() {
      StatsFactory.$add(1);
    };

    this.logVisit();
  }]);
