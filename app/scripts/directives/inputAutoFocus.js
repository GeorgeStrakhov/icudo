'use strict';

/* autofocus an input field on view entry. field has to be marked by 'auto-focus' attribute */

angular.module('icudo').directive('autoFocus', function($timeout) {
  return {
    restrict: 'AC',
    link: function(_scope, _element) {
      $timeout(function(){
        _element[0].focus();
      }, 10);
    }
  };
});
