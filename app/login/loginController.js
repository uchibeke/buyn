var loginControllers = angular.module('myApp.login', ['ngRoute', 'ngStorage', "firebase"]);
loginControllers.controller('LoginController', ['$rootScope', '$scope', '$http', '$localStorage', '$timeout', '$interval', '$sce', '$firebaseObject', '$firebaseArray', '$firebaseAuth', '$location',
function($rootScope, $scope, $http, $localStorage, $timeout, $interval, $sce, $firebaseObject, $firebaseArray, $firebaseAuth, $location) {

	$scope.$storage = $localStorage.$default({
		guestsList : $scope.guests
	});

	var admin,
	    allRef,
	    ref,
	    guestRef;
	// Accepts twiter, facebook or google
	$scope.login = function(loginMethod) {

		var auth = $firebaseAuth();

		auth.$signInWithPopup(loginMethod).then(function(firebaseUser) {
			if (firebase.auth().currentUser) {
				$rootScope.$storage.admin = firebaseUser;
				$rootScope.$storage.admin.token = firebaseUser.credential.accessToken;
				admin = firebaseUser.user;
				$rootScope.$storage.admin.signInUser = admin;
				allRef = firebase.database().ref().child("/admin/" + admin.uid + "events/");
				$scope.$storage.allEvents = $firebaseArray(allRef);

				ref = firebase.database().ref().child("/admin/" + admin.uid + "events/" + $scope.$storage.eventName + "/");
				$scope.$storage.currentEvent = $firebaseArray(ref);

				guestRef = firebase.database().ref().child("/admin/" + admin.uid + "events/" + $scope.$storage.eventName + "/people");
				$scope.$storage.people = $firebaseArray(guestRef);
				
				

				var user = firebase.database().ref().child("/admin/" + admin.uid);
				$rootScope.$storage.user = $firebaseArray(ref);
				
				$location.path('/myevents')
				
				
				location.reload();
			} else {
				event.preventDefault();
				$location.path('/login');
			}
		}).catch(function(error) {
			console.log("Authentication failed:", error);
		});
	};

	// Opera 8.0+
	var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	// Firefox 1.0+
	var isFirefox = typeof InstallTrigger !== 'undefined';
	// At least Safari 3+: "[object HTMLElementConstructor]"
	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
	// Internet Explorer 6-11
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	// Edge 20+
	var isEdge = !isIE && !!window.StyleMedia;
	// Chrome 1+
	var isChrome = !!window.chrome && !!window.chrome.webstore;
	// Blink engine detection
	var isBlink = (isChrome || isOpera) && !!window.CSS;

	$scope.logOut = function() {
		var auth = $firebaseAuth();
		firebase.auth().signOut().then(function(result) {
			// Sign-out successful.
			if (isChrome) {
				delete $localStorage.admin;
			} else {
				$localStorage.$reset($scope.$storage.admin);
			}

		}, function(error) {
			console.log(error);
		});
		if ($location.path('/login')) {
			location.reload();
		}
	};
}]);

