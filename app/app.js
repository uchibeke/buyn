'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.myevent',
  'myApp.dashboard',
  'myApp.addDeal',
  'myApp.login',
  'myApp.version', 
  'firebase',
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.when('/login', {
		templateUrl : 'login/login.html',
		controller : 'LoginController'
	}).when('/myevent', {
		templateUrl : 'myevent/myevent.html',
		controller : 'myeventCtrl'
	}).
	otherwise({redirectTo: '/myevent'});
}])

.run(['$rootScope', '$location', '$firebaseAuth', '$localStorage',
function($rootScope, $location, $firebaseAuth, $localStorage) {
	$rootScope.$storage = $localStorage.$default({
		g : $rootScope.events
	});
	$rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute) {
		var isAuth = $firebaseAuth().$getAuth();
		if ($rootScope.$storage.hasOwnProperty('admin') && $rootScope.$storage.admin.hasOwnProperty('token') && $rootScope.$storage.admin.token != undefined) {
			$location.path(currRoute.originalPath);
			console.log('ALLOW');
			console.log(currRoute.originalPath);
		} else {
			console.log('DENY ');
			if (currRoute.originalPath == '/login') {
				$location.path('/login');
			} else {
				$location.path('/myevent');
			}
		}
	});
}]);
