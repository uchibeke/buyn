var myApp = angular.module('myApp', ['ngRoute', 'mainControllers', 'ticketControllers', 'loginControllers', 'analytics', 'firebase']);

myApp.config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/list', {
		templateUrl : 'partials/list.html',
		controller : 'MainController'
	}).when('/home', {
		templateUrl : 'partials/home.html',
		controller : 'MainController'
	}).when('/login', {
		templateUrl : 'partials/login.html',
		controller : 'LoginController'
	}).when('/register', {
		templateUrl : 'partials/register.html',
		controller : 'LoginController'
	}).otherwise({
		redirectTo : '/home'
	});
}]);

myApp.run(['$rootScope', '$location', '$firebaseAuth', '$localStorage',
function($rootScope, $location, $firebaseAuth, $localStorage, shareDataService) {
	$rootScope.$storage = $localStorage.$default({
		g : $rootScope.guests
	});
	$rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute) {
		var isAuth = $firebaseAuth().$getAuth();
		if ($rootScope.$storage.hasOwnProperty('user') && $rootScope.$storage.user.hasOwnProperty('token') && $rootScope.$storage.user.token != undefined) {
			$location.path(currRoute.originalPath);
			console.log('ALLOW');
		} else {
			console.log('DENY ');
			if (currRoute.originalPath == '/login') {
				$location.path('/login');
			} else {
				$location.path('/home');
			}
		}
	});
}]);
