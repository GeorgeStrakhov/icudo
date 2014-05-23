'use strict';

/*
 * time service: doing all the time stuff. relies on moment.js being globally available (TODO: isolate momentjs dependancy to this service)
 */

angular.module('icudo')
.service('TimeService', ['$log', function($log) {

  var self = this;
  this.now = moment(); //NB! but don't do anythign with this since momentjs wil mutate the original object with every operation

  this.getToday = function() {
    return getFormattedDate(self.now);
  }

  this.getYesterday = function() {
    return getFormattedDate(moment().subtract('days', 1));
  }

  this.validateDateString = function(dateString) {
    if(!dateString) return false;
    return moment(dateString, 'YYYY-MM-DD', true).isValid(); 
  }

  this.formatDate = function(dateObject) {
    return getFormattedDate(moment(dateObject));
  }

  this.formatMoment = function(momentObj) {
    return getFomrattedDate(momentObj);
  }

  this.formatTimestamp = function(timestamp) {
    return getFormattedDate(moment(timestamp));
  }

  /* internal functions */
  function getFormattedDate(theMoment, format) {
    format = (format) ? format : 'YYYY-MM-DD';
    return theMoment.format(format);
  }

}]);
