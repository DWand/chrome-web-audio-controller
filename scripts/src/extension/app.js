var angular = require('angular');

require('script!angularjs-slider/dist/rzslider.js');
require('angularjs-slider/dist/rzslider.css');
require('font-awesome/css/font-awesome.css');

require('./style.less');

var app = angular.module('app', ['rzModule']);

app.controller('AppCtrl', require('./app.controller.js'));
app.service('Player', require('./player.service.js'));
app.service('BrowserBridge', require('./browser-bridge.service.js'));
app.filter('time', require('./time.filter.js'));
app.directive('player', require('./player.directive.js'));
