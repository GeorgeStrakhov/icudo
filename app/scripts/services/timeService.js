'use strict';

/*
 * time service: doing all the time stuff. relies on moment.js being globally available (TODO: isolate momentjs dependancy to this service)
 */

angular.module('icudo')
.service('TimeService', ['$log', function($log) {

  var self = this;
  this.now = moment();

  //$log.log('stuff from timeservice');

  this.getToday = function() {
    return getFormattedDate(self.now);
  }

  /* internal functions */
  function getFormattedDate(theMoment, format) {
    format = (format) ? format : 'YYYY-MM-DD';
    return theMoment.format(format);
  }

}]);
