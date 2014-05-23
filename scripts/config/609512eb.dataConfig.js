'use strict';

/* 
 * config static values
 */

//simple and ugly way to choose between dev and production firebase refs
var refName = (window.location.host == 'icudo.com') ? 'icudo' : 'iuido';

angular.module('icudo')
.constant('dataConfig', {
  firebaseBaseUrl: 'https://'+refName+'.firebaseio.com'
});
